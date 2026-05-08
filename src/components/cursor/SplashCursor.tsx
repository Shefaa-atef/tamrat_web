import { useEffect, useRef } from "react";

/* ── Tamrat brand palette (normalised 0-1) ─────────────────── */
const PALETTE = [
  { r: 0.486, g: 0.239, b: 0.165 }, // #7C3D2A primary
  { r: 0.788, g: 0.482, b: 0.294 }, // #C97B4B secondary
  { r: 0.957, g: 0.788, b: 0.494 }, // #F4C97E accent
];

function pickColor() {
  const c = PALETTE[Math.floor(Math.random() * PALETTE.length)];
  // scale down so the fluid is subtle, not overwhelming
  return { r: c.r * 0.3, g: c.g * 0.3, b: c.b * 0.3 };
}

/* ── Component ─────────────────────────────────────────────── */

export default function SplashCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef    = useRef<number>(0);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const canvas = canvasRef.current!;
    if (!canvas) return;
    let alive = true;

    /* ── config ───────────────────────────────────────────── */
    const config = {
      SIM_RESOLUTION:      128,
      DYE_RESOLUTION:      1024,
      DENSITY_DISSIPATION: 4,
      VELOCITY_DISSIPATION: 2.5,
      PRESSURE:            0.1,
      PRESSURE_ITERATIONS: 20,
      CURL:                3,
      SPLAT_RADIUS:        0.15,
      SPLAT_FORCE:         5000,
      SHADING:             true,
      COLOR_UPDATE_SPEED:  6,
      TRANSPARENT:         true,
    };

    /* ── pointer ──────────────────────────────────────────── */
    interface Pointer {
      id: number;
      texcoordX: number; texcoordY: number;
      prevTexcoordX: number; prevTexcoordY: number;
      deltaX: number; deltaY: number;
      down: boolean; moved: boolean;
      color: { r: number; g: number; b: number };
    }
    const pointers: Pointer[] = [{
      id: -1, texcoordX: 0, texcoordY: 0,
      prevTexcoordX: 0, prevTexcoordY: 0,
      deltaX: 0, deltaY: 0,
      down: false, moved: false, color: { r: 0, g: 0, b: 0 },
    }];

    /* ── WebGL context ────────────────────────────────────── */
    const params = { alpha: true, depth: false, stencil: false, antialias: false, preserveDrawingBuffer: false };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let gl: any = canvas.getContext("webgl2", params);
    const isWebGL2 = !!gl;
    if (!isWebGL2) gl = canvas.getContext("webgl", params) || canvas.getContext("experimental-webgl", params);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let halfFloat: any, supportLinearFiltering: any;
    if (isWebGL2) {
      gl.getExtension("EXT_color_buffer_float");
      supportLinearFiltering = gl.getExtension("OES_texture_float_linear");
    } else {
      halfFloat = gl.getExtension("OES_texture_half_float");
      supportLinearFiltering = gl.getExtension("OES_texture_half_float_linear");
    }
    gl.clearColor(0, 0, 0, 1);

    const halfFloatTexType = isWebGL2 ? gl.HALF_FLOAT : halfFloat?.HALF_FLOAT_OES;

    function getSupportedFormat(internalFmt: number, fmt: number): { internalFormat: number; format: number } | null {
      if (!supportRenderTextureFormat(internalFmt, fmt)) {
        if (internalFmt === gl.R16F)   return getSupportedFormat(gl.RG16F, gl.RG);
        if (internalFmt === gl.RG16F)  return getSupportedFormat(gl.RGBA16F, gl.RGBA);
        return null;
      }
      return { internalFormat: internalFmt, format: fmt };
    }
    function supportRenderTextureFormat(iFmt: number, fmt: number) {
      const tex = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, tex);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texImage2D(gl.TEXTURE_2D, 0, iFmt, 4, 4, 0, fmt, halfFloatTexType, null);
      const fbo = gl.createFramebuffer();
      gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
      gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, tex, 0);
      return gl.checkFramebufferStatus(gl.FRAMEBUFFER) === gl.FRAMEBUFFER_COMPLETE;
    }

    const fmtRGBA = isWebGL2 ? getSupportedFormat(gl.RGBA16F, gl.RGBA) : getSupportedFormat(gl.RGBA, gl.RGBA);
    const fmtRG   = isWebGL2 ? getSupportedFormat(gl.RG16F,   gl.RG)   : getSupportedFormat(gl.RGBA, gl.RGBA);
    const fmtR    = isWebGL2 ? getSupportedFormat(gl.R16F,    gl.RED)  : getSupportedFormat(gl.RGBA, gl.RGBA);

    if (!fmtRGBA || !fmtRG || !fmtR) {
      config.DYE_RESOLUTION = 256;
      config.SHADING = false;
    }
    const filtering = supportLinearFiltering ? gl.LINEAR : gl.NEAREST;

    /* ── shader helpers ───────────────────────────────────── */
    function compile(type: number, src: string, defs?: string[]) {
      const header = defs ? defs.map(d => `#define ${d}\n`).join("") : "";
      const sh = gl.createShader(type);
      gl.shaderSource(sh, header + src);
      gl.compileShader(sh);
      if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) console.error(gl.getShaderInfoLog(sh));
      return sh;
    }
    function createProgram(vert: WebGLShader, frag: WebGLShader) {
      const p = gl.createProgram();
      gl.attachShader(p, vert); gl.attachShader(p, frag); gl.linkProgram(p);
      if (!gl.getProgramParameter(p, gl.LINK_STATUS)) console.error(gl.getProgramInfoLog(p));
      return p;
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function getUniforms(prog: WebGLProgram): Record<string, any> {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const u: Record<string, any> = {};
      const n = gl.getProgramParameter(prog, gl.ACTIVE_UNIFORMS);
      for (let i = 0; i < n; i++) {
        const name = gl.getActiveUniform(prog, i).name;
        u[name] = gl.getUniformLocation(prog, name);
      }
      return u;
    }

    /* ── shaders source ───────────────────────────────────── */
    const baseVert = compile(gl.VERTEX_SHADER, `
      precision highp float;
      attribute vec2 aPosition;
      varying vec2 vUv, vL, vR, vT, vB;
      uniform vec2 texelSize;
      void main() {
        vUv = aPosition * 0.5 + 0.5;
        vL = vUv - vec2(texelSize.x, 0.0);
        vR = vUv + vec2(texelSize.x, 0.0);
        vT = vUv + vec2(0.0, texelSize.y);
        vB = vUv - vec2(0.0, texelSize.y);
        gl_Position = vec4(aPosition, 0.0, 1.0);
      }
    `);

    const copyFrag    = compile(gl.FRAGMENT_SHADER, `precision mediump float; precision mediump sampler2D; varying highp vec2 vUv; uniform sampler2D uTexture; void main(){ gl_FragColor = texture2D(uTexture,vUv); }`);
    const clearFrag   = compile(gl.FRAGMENT_SHADER, `precision mediump float; precision mediump sampler2D; varying highp vec2 vUv; uniform sampler2D uTexture; uniform float value; void main(){ gl_FragColor = value * texture2D(uTexture,vUv); }`);
    const splatFrag   = compile(gl.FRAGMENT_SHADER, `precision highp float; precision highp sampler2D; varying vec2 vUv; uniform sampler2D uTarget; uniform float aspectRatio; uniform vec3 color; uniform vec2 point; uniform float radius; void main(){ vec2 p = vUv-point.xy; p.x*=aspectRatio; vec3 splat=exp(-dot(p,p)/radius)*color; vec3 base=texture2D(uTarget,vUv).xyz; gl_FragColor=vec4(base+splat,1.0); }`);
    const advFrag     = compile(gl.FRAGMENT_SHADER, `precision highp float; precision highp sampler2D; varying vec2 vUv; uniform sampler2D uVelocity,uSource; uniform vec2 texelSize,dyeTexelSize; uniform float dt,dissipation; vec4 bilerp(sampler2D s,vec2 uv,vec2 ts){ vec2 st=uv/ts-0.5; vec2 iuv=floor(st); vec2 fuv=fract(st); vec4 a=texture2D(s,(iuv+vec2(0.5,0.5))*ts); vec4 b=texture2D(s,(iuv+vec2(1.5,0.5))*ts); vec4 c=texture2D(s,(iuv+vec2(0.5,1.5))*ts); vec4 d=texture2D(s,(iuv+vec2(1.5,1.5))*ts); return mix(mix(a,b,fuv.x),mix(c,d,fuv.x),fuv.y); } void main(){ #ifdef MANUAL_FILTERING vec2 coord=vUv-dt*bilerp(uVelocity,vUv,texelSize).xy*texelSize; vec4 result=bilerp(uSource,coord,dyeTexelSize); #else vec2 coord=vUv-dt*texture2D(uVelocity,vUv).xy*texelSize; vec4 result=texture2D(uSource,coord); #endif gl_FragColor=result/(1.0+dissipation*dt); }`, supportLinearFiltering ? undefined : ["MANUAL_FILTERING"]);
    const divFrag     = compile(gl.FRAGMENT_SHADER, `precision mediump float; precision mediump sampler2D; varying highp vec2 vUv,vL,vR,vT,vB; uniform sampler2D uVelocity; void main(){ float L=texture2D(uVelocity,vL).x,R=texture2D(uVelocity,vR).x,T=texture2D(uVelocity,vT).y,B=texture2D(uVelocity,vB).y; vec2 C=texture2D(uVelocity,vUv).xy; if(vL.x<0.0)L=-C.x; if(vR.x>1.0)R=-C.x; if(vT.y>1.0)T=-C.y; if(vB.y<0.0)B=-C.y; gl_FragColor=vec4(0.5*(R-L+T-B),0,0,1); }`);
    const curlFrag    = compile(gl.FRAGMENT_SHADER, `precision mediump float; precision mediump sampler2D; varying highp vec2 vUv,vL,vR,vT,vB; uniform sampler2D uVelocity; void main(){ float L=texture2D(uVelocity,vL).y,R=texture2D(uVelocity,vR).y,T=texture2D(uVelocity,vT).x,B=texture2D(uVelocity,vB).x; gl_FragColor=vec4(0.5*(R-L-T+B),0,0,1); }`);
    const vortFrag    = compile(gl.FRAGMENT_SHADER, `precision highp float; precision highp sampler2D; varying vec2 vUv,vL,vR,vT,vB; uniform sampler2D uVelocity,uCurl; uniform float curl,dt; void main(){ float L=texture2D(uCurl,vL).x,R=texture2D(uCurl,vR).x,T=texture2D(uCurl,vT).x,B=texture2D(uCurl,vB).x,C=texture2D(uCurl,vUv).x; vec2 force=0.5*vec2(abs(T)-abs(B),abs(R)-abs(L)); force/=length(force)+0.0001; force*=curl*C; force.y*=-1.0; vec2 vel=texture2D(uVelocity,vUv).xy+force*dt; gl_FragColor=vec4(clamp(vel,-1000.0,1000.0),0,1); }`);
    const presFrag    = compile(gl.FRAGMENT_SHADER, `precision mediump float; precision mediump sampler2D; varying highp vec2 vUv,vL,vR,vT,vB; uniform sampler2D uPressure,uDivergence; void main(){ float L=texture2D(uPressure,vL).x,R=texture2D(uPressure,vR).x,T=texture2D(uPressure,vT).x,B=texture2D(uPressure,vB).x,div=texture2D(uDivergence,vUv).x; gl_FragColor=vec4((L+R+B+T-div)*0.25,0,0,1); }`);
    const gradFrag    = compile(gl.FRAGMENT_SHADER, `precision mediump float; precision mediump sampler2D; varying highp vec2 vUv,vL,vR,vT,vB; uniform sampler2D uPressure,uVelocity; void main(){ float L=texture2D(uPressure,vL).x,R=texture2D(uPressure,vR).x,T=texture2D(uPressure,vT).x,B=texture2D(uPressure,vB).x; vec2 vel=texture2D(uVelocity,vUv).xy; vel.xy-=vec2(R-L,T-B); gl_FragColor=vec4(vel,0,1); }`);
    const displaySrc  = `
      precision highp float; precision highp sampler2D;
      varying vec2 vUv,vL,vR,vT,vB;
      uniform sampler2D uTexture; uniform vec2 texelSize;
      void main(){
        vec3 c=texture2D(uTexture,vUv).rgb;
        #ifdef SHADING
          vec3 lc=texture2D(uTexture,vL).rgb,rc=texture2D(uTexture,vR).rgb,tc=texture2D(uTexture,vT).rgb,bc=texture2D(uTexture,vB).rgb;
          float dx=length(rc)-length(lc),dy=length(tc)-length(bc);
          vec3 n=normalize(vec3(dx,dy,length(texelSize)));
          c*=clamp(dot(n,vec3(0,0,1))+0.7,0.7,1.0);
        #endif
        float a=max(c.r,max(c.g,c.b));
        gl_FragColor=vec4(c,a);
      }
    `;

    /* ── programs ─────────────────────────────────────────── */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function prog(frag: WebGLShader): { program: WebGLProgram; uniforms: Record<string, any>; bind(): void } {
      const p = createProgram(baseVert, frag);
      return { program: p, uniforms: getUniforms(p), bind() { gl.useProgram(p); } };
    }
    const copyProg  = prog(copyFrag);
    const clearProg = prog(clearFrag);
    const splatProg = prog(splatFrag);
    const advProg   = prog(advFrag);
    const divProg   = prog(divFrag);
    const curlProg  = prog(curlFrag);
    const vortProg  = prog(vortFrag);
    const presProg  = prog(presFrag);
    const gradProg  = prog(gradFrag);

    // display material (keyword-toggled)
    const displayFrags: Record<number, WebGLProgram> = {};
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let displayProg: WebGLProgram | null = null; let displayUniforms: Record<string, any> = {};
    function bindDisplay() {
      const key = config.SHADING ? 1 : 0;
      if (!displayFrags[key]) {
        const f = compile(gl.FRAGMENT_SHADER, displaySrc, config.SHADING ? ["SHADING"] : undefined);
        displayFrags[key] = createProgram(baseVert, f);
      }
      displayProg = displayFrags[key];
      displayUniforms = getUniforms(displayProg);
      gl.useProgram(displayProg);
    }

    /* ── blit quad ────────────────────────────────────────── */
    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1,-1,1,1,1,1,-1]), gl.STATIC_DRAW);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array([0,1,2,0,2,3]), gl.STATIC_DRAW);
    gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(0);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function blit(target: any, clear = false) {
      if (!target) {
        gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
      } else {
        gl.viewport(0, 0, target.width, target.height);
        gl.bindFramebuffer(gl.FRAMEBUFFER, target.fbo);
      }
      if (clear) { gl.clearColor(0,0,0,1); gl.clear(gl.COLOR_BUFFER_BIT); }
      gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0);
    }

    /* ── FBOs ─────────────────────────────────────────────── */
    function createFBO(w: number, h: number, iFmt: number, fmt: number, type: number, param: number) {
      gl.activeTexture(gl.TEXTURE0);
      const tex = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, tex);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, param);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, param);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texImage2D(gl.TEXTURE_2D, 0, iFmt, w, h, 0, fmt, type, null);
      const fbo = gl.createFramebuffer();
      gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
      gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, tex, 0);
      gl.viewport(0,0,w,h); gl.clear(gl.COLOR_BUFFER_BIT);
      return { texture: tex, fbo, width: w, height: h,
        texelSizeX: 1/w, texelSizeY: 1/h,
        attach(id: number) { gl.activeTexture(gl.TEXTURE0+id); gl.bindTexture(gl.TEXTURE_2D, tex); return id; } };
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function createDoubleFBO(w: number, h: number, iFmt: number, fmt: number, type: number, param: number): any {
      let a = createFBO(w,h,iFmt,fmt,type,param);
      let b = createFBO(w,h,iFmt,fmt,type,param);
      return { width:w, height:h, texelSizeX:a.texelSizeX, texelSizeY:a.texelSizeY,
        get read(){ return a; }, set read(v){ a=v; },
        get write(){ return b; }, set write(v){ b=v; },
        swap(){ const t=a; a=b; b=t; } };
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function resizeFBO(target: any, w: number, h: number, iFmt: number, fmt: number, type: number, param: number) {
      const n = createFBO(w,h,iFmt,fmt,type,param);
      copyProg.bind();
      gl.uniform1i(copyProg.uniforms.uTexture, target.attach(0));
      blit(n); return n;
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function resizeDoubleFBO(target: any, w: number, h: number, iFmt: number, fmt: number, type: number, param: number) {
      if (target.width===w && target.height===h) return target;
      target.read = resizeFBO(target.read,w,h,iFmt,fmt,type,param);
      target.write = createFBO(w,h,iFmt,fmt,type,param);
      target.width=w; target.height=h; target.texelSizeX=1/w; target.texelSizeY=1/h;
      return target;
    }

    function getResolution(res: number) {
      let ar = gl.drawingBufferWidth / gl.drawingBufferHeight;
      if (ar < 1) ar = 1/ar;
      const min = Math.round(res), max = Math.round(res * ar);
      return gl.drawingBufferWidth > gl.drawingBufferHeight
        ? { width: max, height: min } : { width: min, height: max };
    }
    function scaleByDPR(v: number) { return Math.floor(v * (window.devicePixelRatio || 1)); }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let dye: any, velocity: any, divergence: any, curl: any, pressure: any;

    function initFBOs() {
      const simRes = getResolution(config.SIM_RESOLUTION);
      const dyeRes = getResolution(config.DYE_RESOLUTION);
      const type = halfFloatTexType;
      const rgba = fmtRGBA!; const rg = fmtRG!; const r = fmtR!;
      gl.disable(gl.BLEND);
      dye      = dye      ? resizeDoubleFBO(dye, dyeRes.width, dyeRes.height, rgba.internalFormat, rgba.format, type, filtering) : createDoubleFBO(dyeRes.width, dyeRes.height, rgba.internalFormat, rgba.format, type, filtering);
      velocity = velocity ? resizeDoubleFBO(velocity, simRes.width, simRes.height, rg.internalFormat, rg.format, type, filtering) : createDoubleFBO(simRes.width, simRes.height, rg.internalFormat, rg.format, type, filtering);
      divergence = createFBO(simRes.width, simRes.height, r.internalFormat, r.format, type, gl.NEAREST);
      curl       = createFBO(simRes.width, simRes.height, r.internalFormat, r.format, type, gl.NEAREST);
      pressure   = createDoubleFBO(simRes.width, simRes.height, r.internalFormat, r.format, type, gl.NEAREST);
    }
    initFBOs();

    /* ── splat ────────────────────────────────────────────── */
    function correctRadius(r: number) {
      const ar = canvas.width / canvas.height;
      return ar > 1 ? r * ar : r;
    }
    function splat(x: number, y: number, dx: number, dy: number, color: { r:number; g:number; b:number }) {
      splatProg.bind();
      gl.uniform1i(splatProg.uniforms.uTarget, velocity.read.attach(0));
      gl.uniform1f(splatProg.uniforms.aspectRatio, canvas.width/canvas.height);
      gl.uniform2f(splatProg.uniforms.point, x, y);
      gl.uniform3f(splatProg.uniforms.color, dx, dy, 0);
      gl.uniform1f(splatProg.uniforms.radius, correctRadius(config.SPLAT_RADIUS/100));
      blit(velocity.write); velocity.swap();
      gl.uniform1i(splatProg.uniforms.uTarget, dye.read.attach(0));
      gl.uniform3f(splatProg.uniforms.color, color.r, color.g, color.b);
      blit(dye.write); dye.swap();
    }
    function splatPointer(p: Pointer) {
      splat(p.texcoordX, p.texcoordY, p.deltaX*config.SPLAT_FORCE, p.deltaY*config.SPLAT_FORCE, p.color);
    }

    /* ── sim step ─────────────────────────────────────────── */
    function step(dt: number) {
      gl.disable(gl.BLEND);
      curlProg.bind();
      gl.uniform2f(curlProg.uniforms.texelSize, velocity.texelSizeX, velocity.texelSizeY);
      gl.uniform1i(curlProg.uniforms.uVelocity, velocity.read.attach(0));
      blit(curl);
      vortProg.bind();
      gl.uniform2f(vortProg.uniforms.texelSize, velocity.texelSizeX, velocity.texelSizeY);
      gl.uniform1i(vortProg.uniforms.uVelocity, velocity.read.attach(0));
      gl.uniform1i(vortProg.uniforms.uCurl,     curl.attach(1));
      gl.uniform1f(vortProg.uniforms.curl, config.CURL);
      gl.uniform1f(vortProg.uniforms.dt, dt);
      blit(velocity.write); velocity.swap();
      divProg.bind();
      gl.uniform2f(divProg.uniforms.texelSize, velocity.texelSizeX, velocity.texelSizeY);
      gl.uniform1i(divProg.uniforms.uVelocity, velocity.read.attach(0));
      blit(divergence);
      clearProg.bind();
      gl.uniform1i(clearProg.uniforms.uTexture, pressure.read.attach(0));
      gl.uniform1f(clearProg.uniforms.value, config.PRESSURE);
      blit(pressure.write); pressure.swap();
      presProg.bind();
      gl.uniform2f(presProg.uniforms.texelSize, velocity.texelSizeX, velocity.texelSizeY);
      gl.uniform1i(presProg.uniforms.uDivergence, divergence.attach(0));
      for (let i = 0; i < config.PRESSURE_ITERATIONS; i++) {
        gl.uniform1i(presProg.uniforms.uPressure, pressure.read.attach(1));
        blit(pressure.write); pressure.swap();
      }
      gradProg.bind();
      gl.uniform2f(gradProg.uniforms.texelSize, velocity.texelSizeX, velocity.texelSizeY);
      gl.uniform1i(gradProg.uniforms.uPressure, pressure.read.attach(0));
      gl.uniform1i(gradProg.uniforms.uVelocity, velocity.read.attach(1));
      blit(velocity.write); velocity.swap();
      advProg.bind();
      gl.uniform2f(advProg.uniforms.texelSize, velocity.texelSizeX, velocity.texelSizeY);
      if (!supportLinearFiltering) gl.uniform2f(advProg.uniforms.dyeTexelSize, velocity.texelSizeX, velocity.texelSizeY);
      const velId = velocity.read.attach(0);
      gl.uniform1i(advProg.uniforms.uVelocity, velId);
      gl.uniform1i(advProg.uniforms.uSource,   velId);
      gl.uniform1f(advProg.uniforms.dt, dt);
      gl.uniform1f(advProg.uniforms.dissipation, config.VELOCITY_DISSIPATION);
      blit(velocity.write); velocity.swap();
      if (!supportLinearFiltering) gl.uniform2f(advProg.uniforms.dyeTexelSize, dye.texelSizeX, dye.texelSizeY);
      gl.uniform1i(advProg.uniforms.uVelocity, velocity.read.attach(0));
      gl.uniform1i(advProg.uniforms.uSource,   dye.read.attach(1));
      gl.uniform1f(advProg.uniforms.dissipation, config.DENSITY_DISSIPATION);
      blit(dye.write); dye.swap();
    }

    function render() {
      gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
      gl.enable(gl.BLEND);
      bindDisplay();
      if (config.SHADING) gl.uniform2f(displayUniforms.texelSize, 1/gl.drawingBufferWidth, 1/gl.drawingBufferHeight);
      gl.uniform1i(displayUniforms.uTexture, dye.read.attach(0));
      blit(null);
    }

    /* ── RAF loop ─────────────────────────────────────────── */
    let lastTime = Date.now();
    let colorTimer = 0;
    function frame() {
      if (!alive) return;
      const now = Date.now();
      const dt  = Math.min((now - lastTime) / 1000, 0.016666);
      lastTime  = now;
      colorTimer += dt * config.COLOR_UPDATE_SPEED;
      if (colorTimer >= 1) {
        colorTimer = 0;
        pointers.forEach(p => { p.color = pickColor(); });
      }
      if (canvas.width !== scaleByDPR(canvas.clientWidth) || canvas.height !== scaleByDPR(canvas.clientHeight)) {
        canvas.width  = scaleByDPR(canvas.clientWidth);
        canvas.height = scaleByDPR(canvas.clientHeight);
        initFBOs();
      }
      pointers.forEach(p => { if (p.moved) { p.moved = false; splatPointer(p); } });
      step(dt);
      render();
      rafRef.current = requestAnimationFrame(frame);
    }
    rafRef.current = requestAnimationFrame(frame);

    /* ── pointer helpers ──────────────────────────────────── */
    function correctDX(d: number) { const ar = canvas.width/canvas.height; return ar<1 ? d*ar : d; }
    function correctDY(d: number) { const ar = canvas.width/canvas.height; return ar>1 ? d/ar : d; }

    /* ── event handlers ───────────────────────────────────── */
    function onMouseDown(e: MouseEvent) {
      const p = pointers[0];
      p.down = true; p.moved = false;
      p.texcoordX = scaleByDPR(e.clientX)/canvas.width;
      p.texcoordY = 1 - scaleByDPR(e.clientY)/canvas.height;
      p.prevTexcoordX = p.texcoordX; p.prevTexcoordY = p.texcoordY;
      p.deltaX = 0; p.deltaY = 0; p.color = pickColor();
      // burst on click
      const c = pickColor(); c.r*=10; c.g*=10; c.b*=10;
      splat(p.texcoordX, p.texcoordY, (Math.random()-0.5)*10, (Math.random()-0.5)*30, c);
    }
    function onMouseMove(e: MouseEvent) {
      const p = pointers[0];
      const x = scaleByDPR(e.clientX)/canvas.width;
      const y = 1 - scaleByDPR(e.clientY)/canvas.height;
      p.deltaX = correctDX(x - p.texcoordX);
      p.deltaY = correctDY(y - p.texcoordY);
      p.prevTexcoordX = p.texcoordX; p.prevTexcoordY = p.texcoordY;
      p.texcoordX = x; p.texcoordY = y;
      p.moved = Math.abs(p.deltaX) > 0 || Math.abs(p.deltaY) > 0;
    }
    function onTouchStart(e: TouchEvent) {
      const p = pointers[0];
      const t = e.targetTouches[0];
      p.texcoordX = scaleByDPR(t.clientX)/canvas.width;
      p.texcoordY = 1 - scaleByDPR(t.clientY)/canvas.height;
      p.color = pickColor();
    }
    function onTouchMove(e: TouchEvent) {
      const p = pointers[0];
      const t = e.targetTouches[0];
      const x = scaleByDPR(t.clientX)/canvas.width;
      const y = 1 - scaleByDPR(t.clientY)/canvas.height;
      p.deltaX = correctDX(x - p.texcoordX);
      p.deltaY = correctDY(y - p.texcoordY);
      p.texcoordX = x; p.texcoordY = y;
      p.moved = true;
    }
    function onTouchEnd() { pointers[0].down = false; }

    window.addEventListener("mousedown",  onMouseDown);
    window.addEventListener("mousemove",  onMouseMove);
    window.addEventListener("touchstart", onTouchStart);
    window.addEventListener("touchmove",  onTouchMove, { passive: true });
    window.addEventListener("touchend",   onTouchEnd);

    return () => {
      alive = false;
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("mousedown",  onMouseDown);
      window.removeEventListener("mousemove",  onMouseMove);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove",  onTouchMove);
      window.removeEventListener("touchend",   onTouchEnd);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 pointer-events-none">
      <canvas ref={canvasRef} className="w-screen h-screen block" />
    </div>
  );
}
