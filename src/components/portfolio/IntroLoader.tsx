'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

interface IntroLoaderProps {
  onComplete?: () => void;
}

const WELCOME_TEXTS = [
  'Welcome', 'ಸ್ವಾಗತ', 'स्वागत है', 'வரவேற்கிறோம்', 'స్వాಗతం',
  'ಸ್ವಾಗതം', 'স্বাগতম', 'ગુજરાતી', 'स्वागत आहे', 'ਸੁਆਗਤ ਹੈ',
];

const randomColors = (count: number) => {
  return new Array(count)
    .fill(0)
    .map(() => "#" + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0'));
};

const IntroLoader: React.FC<IntroLoaderProps> = ({ onComplete }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null); 
  const sakuraCanvasRef = useRef<HTMLCanvasElement>(null); 
  const welcomeRef = useRef<HTMLDivElement>(null);
  const hintRef = useRef<HTMLParagraphElement>(null);
  const skipRef = useRef<HTMLButtonElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const tubesAppRef = useRef<any>(null);
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    if (!sakuraCanvasRef.current || !clicked) return;

    const canvas = sakuraCanvasRef.current;
    const gl = canvas.getContext('webgl', { 
      alpha: true,
      antialias: true,
      premultipliedAlpha: false
    }) || canvas.getContext('experimental-webgl', {
      alpha: true,
      antialias: true,
      premultipliedAlpha: false
    }) as WebGLRenderingContext;
    if (!gl) return;

    // --- Shader Definitions ---
    const sakura_point_vsh = 'uniform mat4 uProjection;uniform mat4 uModelview;uniform vec3 uResolution;uniform vec3 uOffset;uniform vec3 uDOF;uniform vec3 uFade;attribute vec3 aPosition;attribute vec3 aEuler;attribute vec2 aMisc;varying vec3 pposition;varying float psize;varying float palpha;varying float pdist;varying vec3 normX;varying vec3 normY;varying vec3 normZ;varying vec3 normal;varying float diffuse;varying float specular;varying float rstop;varying float distancefade;void main(void){vec4 pos=uModelview*vec4(aPosition+uOffset,1.0);gl_Position=uProjection*pos;gl_PointSize=aMisc.x*uProjection[1][1]/-pos.z*uResolution.y*0.5;pposition=pos.xyz;psize=aMisc.x;pdist=length(pos.xyz);palpha=smoothstep(0.0,1.0,(pdist-0.1)/uFade.z);vec3 elrsn=sin(aEuler);vec3 elrcs=cos(aEuler);mat3 rotx=mat3(1.0,0.0,0.0,0.0,elrcs.x,elrsn.x,0.0,-elrsn.x,elrcs.x);mat3 roty=mat3(elrcs.y,0.0,-elrsn.y,0.0,1.0,0.0,elrsn.y,0.0,elrcs.y);mat3 rotz=mat3(elrcs.z,elrsn.z,0.0,-elrsn.z,elrcs.z,0.0,0.0,0.0,1.0);mat3 rotmat=rotx*roty*rotz;normal=rotmat[2];mat3 trrotm=mat3(rotmat[0][0],rotmat[1][0],rotmat[2][0],rotmat[0][1],rotmat[1][1],rotmat[2][1],rotmat[0][2],rotmat[1][2],rotmat[2][2]);normX=trrotm[0];normY=trrotm[1];normZ=trrotm[2];const vec3 lit=vec3(0.6917144638660746,0.6917144638660746,-0.20751433915982237);float tmpdfs=dot(lit,normal);if(tmpdfs<0.0){normal=-normal;tmpdfs=dot(lit,normal);}diffuse=0.4+tmpdfs;vec3 eyev=normalize(-pos.xyz);if(dot(eyev,normal)>0.0){vec3 hv=normalize(eyev+lit);specular=pow(max(dot(hv,normal),0.0),20.0);}else{specular=0.0;}rstop=clamp((abs(pdist-uDOF.x)-uDOF.y)/uDOF.z,0.0,1.0);rstop=pow(rstop,0.5);distancefade=min(1.0,exp((uFade.x-pdist)*0.69315/uFade.y));}';
    const sakura_point_fsh = 'precision highp float;uniform vec3 uDOF;uniform vec3 uFade;const vec3 fadeCol=vec3(0.08,0.03,0.06);varying vec3 pposition;varying float psize;varying float palpha;varying float pdist;varying vec3 normX;varying vec3 normY;varying vec3 normZ;varying vec3 normal;varying float diffuse;varying float specular;varying float rstop;varying float distancefade;float ellipse(vec2 p,vec2 o,vec2 r){vec2 lp=(p-o)/r;return length(lp)-1.0;}void main(void){vec3 p=vec3(gl_PointCoord-vec2(0.5,0.5),0.0)*2.0;vec3 d=vec3(0.0,0.0,-1.0);float nd=normZ.z;if(abs(nd)<0.0001)discard;float np=dot(normZ,p);vec3 tp=p+d*np/nd;vec2 coord=vec2(dot(normX,tp),dot(normY,tp));const float flwrsn=0.258819045102521;const float flwrcs=0.965925826289068;mat2 flwrm=mat2(flwrcs,-flwrsn,flwrsn,flwrcs);vec2 flwrp=vec2(abs(coord.x),coord.y)*flwrm;float r;if(flwrp.x<0.0){r=ellipse(flwrp,vec2(0.065,0.024)*0.5,vec2(0.36,0.96)*0.5);}else{r=ellipse(flwrp,vec2(0.065,0.024)*0.5,vec2(0.58,0.96)*0.5);}if(r>rstop)discard;vec3 col=mix(vec3(1.0,0.8,0.75),vec3(1.0,0.9,0.87),r);float grady=mix(0.0,1.0,pow(coord.y*0.5+0.5,0.35));col*=vec3(1.0,grady,grady);col*=mix(0.8,1.0,pow(abs(coord.x),0.3));col=col*diffuse+specular;col=mix(fadeCol,col,distancefade);float alpha=(rstop>0.001)?(0.5-r/(rstop*2.0)):1.0;alpha=smoothstep(0.0,1.0,alpha)*palpha;gl_FragColor=vec4(col*0.5,alpha);}';
    const fx_common_vsh = 'uniform vec3 uResolution;attribute vec2 aPosition;varying vec2 texCoord;varying vec2 screenCoord;void main(void){gl_Position=vec4(aPosition,0.0,1.0);texCoord=aPosition.xy*0.5+vec2(0.5,0.5);screenCoord=aPosition.xy*vec2(uResolution.z,1.0);}';
    const bg_fsh = 'precision highp float;uniform vec2 uTimes;varying vec2 texCoord;varying vec2 screenCoord;void main(void){vec3 col;float c;vec2 tmpv=texCoord*vec2(0.8,1.0)-vec2(0.95,1.0);c=exp(-pow(length(tmpv)*1.8,2.0));gl_FragColor=vec4(mix(vec3(0.02,0.0,0.03),vec3(0.96,0.98,1.0)*1.5,c)*0.5,1.0);}';
    const pp_final_fsh = 'precision highp float;uniform sampler2D uSrc;uniform sampler2D uBloom;uniform vec2 uDelta;varying vec2 texCoord;varying vec2 screenCoord;void main(void){vec4 srccol=texture2D(uSrc,texCoord)*2.0;vec4 bloomcol=texture2D(uBloom,texCoord);vec4 col=srccol+bloomcol*(vec4(1.0)+srccol);col=pow(col,vec4(0.45454545454545));gl_FragColor=vec4(col.rgb,1.0);gl_FragColor.a=1.0;}';

    const Vector3 = {
      create: (x, y, z) => ({ x, y, z }),
      normalize: (v) => {
        let l = Math.sqrt(v.x * v.x + v.y * v.y + v.z * v.z);
        if (l > 0.00001) { l = 1.0 / l; v.x *= l; v.y *= l; v.z *= l; }
      },
      cross: (v, v0, v1) => {
        v.x = v0.y * v1.z - v0.z * v1.y; v.y = v0.z * v1.x - v0.x * v1.z; v.z = v0.x * v1.y - v0.y * v1.x;
      }
    };

    const Matrix44 = {
      createIdentity: () => new Float32Array([1,0,0,0, 0,1,0,0, 0,0,1,0, 0,0,0,1]),
      loadProjection: (m, aspect, vdeg, near, far) => {
        let h = near * Math.tan(vdeg * Math.PI / 180 * 0.5) * 2; let w = h * aspect;
        m[0]=2*near/w; m[5]=2*near/h; m[10]=-(far+near)/(far-near); m[11]=-1; m[14]=-2*far*near/(far-near); m[15]=0;
      },
      loadLookAt: (m, vpos, vlook, vup) => {
        let frontv = Vector3.create(vpos.x - vlook.x, vpos.y - vlook.y, vpos.z - vlook.z); Vector3.normalize(frontv);
        let sidev = Vector3.create(1, 0, 0); Vector3.cross(sidev, vup, frontv); Vector3.normalize(sidev);
        let topv = Vector3.create(1, 0, 0); Vector3.cross(topv, frontv, sidev); Vector3.normalize(topv);
        m[0]=sidev.x; m[1]=topv.x; m[2]=frontv.x; m[4]=sidev.y; m[5]=topv.y; m[6]=frontv.y; m[8]=sidev.z; m[9]=topv.z; m[10]=frontv.z;
        m[12]=-(vpos.x*m[0]+vpos.y*m[4]+vpos.z*m[8]); m[13]=-(vpos.x*m[1]+vpos.y*m[5]+vpos.z*m[9]); m[14]=-(vpos.x*m[2]+vpos.y*m[6]+vpos.z*m[10]); m[15]=1;
      }
    };

    const renderSpec: any = { width: 0, height: 0, aspect: 1, array: new Float32Array(3) };
    const createRT = (w, h) => {
      const rt: any = { width: w, height: h };
      rt.frameBuffer = gl.createFramebuffer(); rt.renderBuffer = gl.createRenderbuffer(); rt.texture = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, rt.texture);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, w, h, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.bindFramebuffer(gl.FRAMEBUFFER, rt.frameBuffer);
      gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, rt.texture, 0);
      gl.bindRenderbuffer(gl.RENDERBUFFER, rt.renderBuffer);
      gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_COMPONENT16, w, h);
      gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.RENDERBUFFER, rt.renderBuffer);
      return rt;
    };

    const compileShader = (type, src) => {
      const s = gl.createShader(type)!; gl.shaderSource(s, src); gl.compileShader(s);
      return s;
    };

    const createProg = (vsrc, fsrc, unifs, attrs) => {
      const p = gl.createProgram()!;
      gl.attachShader(p, compileShader(gl.VERTEX_SHADER, vsrc)!);
      gl.attachShader(p, compileShader(gl.FRAGMENT_SHADER, fsrc)!);
      gl.linkProgram(p);
      const res: any = { program: p, uniforms: {}, attributes: {} };
      unifs.forEach(u => res.uniforms[u] = gl.getUniformLocation(p, u));
      attrs.forEach(a => res.attributes[a] = gl.getAttribLocation(p, a));
      return res;
    };

    renderSpec.mainRT = createRT(canvas.width, canvas.height);
    gl.enable(gl.BLEND); gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    
    const flowerPrg = createProg(sakura_point_vsh, sakura_point_fsh, ['uProjection','uModelview','uResolution','uOffset','uDOF','uFade'], ['aPosition','aEuler','aMisc']);
    const bgPrg = createProg(fx_common_vsh, bg_fsh, ['uTimes'], ['aPosition']);
    const finalPrg = createProg(fx_common_vsh, pp_final_fsh, ['uSrc'], ['aPosition']);

    const numFlowers = 2000; 
    const particles = Array.from({length: numFlowers}, () => ({
      pos: [ (Math.random()*2-1)*40, (Math.random()*2-1)*30, (Math.random()*2-1)*30 ],
      vel: [ (Math.random()*2-1)*0.3+0.8, (Math.random()*2-1)*0.2-1.0, (Math.random()*2-1)*0.3+0.5 ],
      rot: [ (Math.random()*2-1)*Math.PI, (Math.random()*2-1)*Math.PI, (Math.random()*2-1)*Math.PI ],
      euler: [ Math.random()*Math.PI*2, Math.random()*Math.PI*2, Math.random()*Math.PI*2 ],
      size: 0.9 + Math.random()*0.1
    }));

    const dataArray = new Float32Array(numFlowers * 8);
    const buffer = gl.createBuffer();
    const quadBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, quadBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 1,-1, -1,1, 1,1]), gl.STATIC_DRAW);

    const timeInfo = { start: Date.now(), prev: Date.now(), delta: 0, elapsed: 0 };
    const camera = { position: {x:0, y:0, z:40}, lookat: {x:0, y:0, z:0}, up: {x:0, y:1, z:0}, matrix: Matrix44.createIdentity() };
    const projection = { matrix: Matrix44.createIdentity() };

    const render = () => {
      const now = Date.now();
      timeInfo.delta = (now - timeInfo.prev) / 1000;
      timeInfo.elapsed = (now - timeInfo.start) / 1000;
      timeInfo.prev = now;

      particles.forEach((p, i) => {
        p.pos[0] += p.vel[0] * timeInfo.delta; 
        p.pos[1] += p.vel[1] * timeInfo.delta; 
        p.pos[2] += p.vel[2] * timeInfo.delta;
        p.euler[0] += p.rot[0] * timeInfo.delta; 
        p.euler[1] += p.rot[1] * timeInfo.delta; 
        p.euler[2] += p.rot[2] * timeInfo.delta;

        if(p.pos[0] > 40) p.pos[0] = -40;
        if(p.pos[0] < -40) p.pos[0] = 40;
        if(p.pos[1] > 30) p.pos[1] = -30;
        if(p.pos[1] < -30) p.pos[1] = 30;

        let idx = i*8; dataArray.set([...p.pos, ...p.euler, p.size, 1.0], idx);
      });

      gl.bindFramebuffer(gl.FRAMEBUFFER, renderSpec.mainRT.frameBuffer);
      gl.viewport(0, 0, renderSpec.width, renderSpec.height);
      gl.clearColor(0.005, 0, 0.05, 1); gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

      gl.disable(gl.DEPTH_TEST); gl.useProgram(bgPrg.program);
      gl.uniform3fv(bgPrg.uniforms.uResolution, renderSpec.array); gl.uniform2f(bgPrg.uniforms.uTimes, timeInfo.elapsed, timeInfo.delta);
      gl.bindBuffer(gl.ARRAY_BUFFER, quadBuffer); gl.enableVertexAttribArray(0); gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

      gl.enable(gl.DEPTH_TEST); gl.useProgram(flowerPrg.program);
      Matrix44.loadLookAt(camera.matrix, camera.position, camera.lookat, camera.up);
      Matrix44.loadProjection(projection.matrix, renderSpec.aspect, 60, 0.1, 100);
      gl.uniformMatrix4fv(flowerPrg.uniforms.uProjection, false, projection.matrix);
      gl.uniformMatrix4fv(flowerPrg.uniforms.uModelview, false, camera.matrix);
      gl.uniform3fv(flowerPrg.uniforms.uResolution, renderSpec.array);
      gl.uniform3f(flowerPrg.uniforms.uDOF, 10, 4, 8); gl.uniform3f(flowerPrg.uniforms.uFade, 10, 20, 0.1);
      gl.uniform3f(flowerPrg.uniforms.uOffset, 0, 0, 0);
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer); gl.bufferData(gl.ARRAY_BUFFER, dataArray, gl.DYNAMIC_DRAW);
      gl.enableVertexAttribArray(flowerPrg.attributes.aPosition); gl.vertexAttribPointer(flowerPrg.attributes.aPosition, 3, gl.FLOAT, false, 32, 0);
      gl.enableVertexAttribArray(flowerPrg.attributes.aEuler); gl.vertexAttribPointer(flowerPrg.attributes.aEuler, 3, gl.FLOAT, false, 32, 12);
      gl.enableVertexAttribArray(flowerPrg.attributes.aMisc); gl.vertexAttribPointer(flowerPrg.attributes.aMisc, 2, gl.FLOAT, false, 32, 24);
      gl.drawArrays(gl.POINTS, 0, numFlowers);

      gl.bindFramebuffer(gl.FRAMEBUFFER, null);
      gl.viewport(0, 0, renderSpec.width, renderSpec.height);
      gl.useProgram(finalPrg.program);
      gl.activeTexture(gl.TEXTURE0); gl.bindTexture(gl.TEXTURE_2D, renderSpec.mainRT.texture);
      gl.uniform1i(finalPrg.uniforms.uSrc, 0);
      gl.bindBuffer(gl.ARRAY_BUFFER, quadBuffer); gl.enableVertexAttribArray(0); gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

      if(clicked) requestAnimationFrame(render);
    };

    const handleResize = () => {
      renderSpec.width = window.innerWidth; renderSpec.height = window.innerHeight;
      renderSpec.aspect = renderSpec.width / renderSpec.height;
      renderSpec.array.set([renderSpec.width, renderSpec.height, renderSpec.aspect]);
      canvas.width = renderSpec.width; canvas.height = renderSpec.height;
      renderSpec.mainRT = createRT(renderSpec.width, renderSpec.height);
    };
    window.addEventListener('resize', handleResize); handleResize(); 
    if (clicked) render();
    return () => window.removeEventListener('resize', handleResize);
  }, [clicked]);

  useEffect(() => {
    const introAudio = new Audio('/sounds/intro.wav'); introAudio.volume = 0.15; audioRef.current = introAudio;
    const glitchAudio = new Audio('/sounds/glitch.mp3'); glitchAudio.volume = 0.3; (window as any).glitchAudio = glitchAudio;
  }, []);

  useEffect(() => {
    if (!canvasRef.current) return;
    let disposed = false; let app: any;
    const initTubesCursor = async () => {
      const script = document.createElement('script');
      script.textContent = `
        import TubesCursor from "https://cdn.jsdelivr.net/npm/threejs-components@0.0.19/build/cursors/tubes1.min.js";
        const app = TubesCursor(document.getElementById('canvas'), {
          tubes: {
            colors: ['#ff2a2a', '#ff6a00', '#ffffff'],
            lights: { intensity: 90, colors: ['#ff2a2a', '#ff6a00', '#ffffff', '#ff9999'] }
          }
        });
        document.body.addEventListener('click', () => {
          const colors = randomColors(3); const lightsColors = randomColors(4);
          app.tubes.setColors(colors); app.tubes.setLightsColors(lightsColors);
        });
        function randomColors(count) { return new Array(count).fill(0).map(() => "#" + Math.floor(Math.random() * 16777215).toString(16).padStart(6, "0")); }
        window.tubesApp = app;
      `;
      script.type = 'module'; document.head.appendChild(script);
      await new Promise(resolve => setTimeout(resolve, 1000));
      if (disposed) return;
      app = (window as any).tubesApp; if (app) tubesAppRef.current = app;
    };
    initTubesCursor();
    return () => { disposed = true; if (app && app.dispose) app.dispose(); };
  }, []);

  useEffect(() => {
    if (!buttonRef.current) return;
    const button = buttonRef.current;
    
    // Setup button text glitch effect
    for (let i = 0; i < 600; i++) {
      const span = document.createElement('span'); 
      span.style.left = `${i * 2}px`; 
      span.style.transitionDelay = `${Math.random() * 0.5}s`;
      button.appendChild(span);
    }

    // Intro Animation
    gsap.fromTo(button, { opacity: 0, scale: 0.85 }, { opacity: 1, scale: 1, duration: 1.4, ease: 'power4.out' });

    const handleMouseEnter = () => {
      if (clicked) return; // Prevent interaction if clicked
      gsap.to(button, { scale: 1.04, duration: 0.3 });
      const glitchAudio = (window as any).glitchAudio; 
      if (glitchAudio) { 
        glitchAudio.currentTime = 0; 
        glitchAudio.play().catch(() => {}); 
      }
    };

    const handleMouseLeave = () => {
      if (clicked) return; // Prevent interaction if clicked
      gsap.to(button, { scale: 1, duration: 0.3 });
    };

    button.addEventListener('mouseenter', handleMouseEnter); 
    button.addEventListener('mouseleave', handleMouseLeave);
    
    return () => { 
      button.removeEventListener('mouseenter', handleMouseEnter); 
      button.removeEventListener('mouseleave', handleMouseLeave); 
    };
  }, [clicked]);

  const handleClick = () => {
    if (clicked) return;
    setClicked(true);
    audioRef.current?.play().catch(() => {});
    
    const tl = gsap.timeline();
    
    // Disable interactions immediately
    if (buttonRef.current) {
        buttonRef.current.style.pointerEvents = 'none';
    }

    // 1. FIX: Use autoAlpha: 0 to ensure it becomes visibility: hidden after opacity: 0
    tl.to(buttonRef.current, { autoAlpha: 0, scale: 0.95, duration: 0.6 });
    if (hintRef.current) tl.to(hintRef.current, { opacity: 0, duration: 0.4 }, "-=0.4");
    
    WELCOME_TEXTS.forEach((text) => {
      tl.set(welcomeRef.current, { textContent: text });
      tl.fromTo(welcomeRef.current, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.6 });
      tl.to(welcomeRef.current, { opacity: 0, y: -10, duration: 0.4, delay: 0.6 });
    });
    
    tl.to([canvasRef.current, sakuraCanvasRef.current], { opacity: 0, duration: 1 });
    tl.to(containerRef.current, { opacity: 0, duration: 0.8, onComplete: () => { tubesAppRef.current?.dispose?.(); onComplete?.(); } });
  };

  return (
    <div ref={containerRef} className="fixed inset-0 z-[100] flex items-center justify-center bg-[#080008]">
      <canvas 
        ref={sakuraCanvasRef} 
        className={`fixed inset-0 z-0 pointer-events-none transition-opacity duration-1000 ${clicked ? 'opacity-100' : 'opacity-0'}`} 
        style={{ width: '100vw', height: '100vh' }}
      />
      <canvas 
        ref={canvasRef} 
        id="canvas" 
        className={`fixed inset-0 z-[1] mix-blend-screen transition-opacity duration-1000 ${clicked ? 'opacity-0' : 'opacity-70'}`} 
      />
      <div className="relative z-10 text-center">
        <button 
            ref={buttonRef} 
            onClick={handleClick} 
            className="btn"
            disabled={clicked} 
        >
          SHIVARAJ N KENGANNAVAR
        </button>
        {!clicked && (
          <p ref={hintRef} className="mt-8 text-white/50 text-xs tracking-widest select-none">
            CLICK TO ENTER
          </p>
        )}
        <div 
            ref={welcomeRef} 
            className="absolute inset-0 flex items-center justify-center text-white text-4xl md:text-6xl lg:text-7xl font-bold tracking-wide pointer-events-none drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]" 
        />
      </div>
      <button 
        ref={skipRef} 
        onClick={() => onComplete?.()} 
        className="fixed bottom-8 right-8 px-4 py-2 text-white/50 text-xs font-light tracking-widest border border-white/10 rounded-full backdrop-blur-sm hover:bg-white/5 hover:text-white/60 transition-all duration-500 hover:border-white/20 hover:scale-105 z-[150]"
      >
        SKIP INTRO
      </button>
    </div>
  );
};

export default IntroLoader;