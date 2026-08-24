'use client';

import React, { useEffect, useRef } from 'react';

export function BackgroundCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const gl = canvas.getContext('webgl', { alpha: true, antialias: false });
    if (!gl) return;

    const vsSource = `
      attribute vec2 a_position;
      void main() {
        gl_Position = vec4(a_position, 0.0, 1.0);
      }
    `;

    const fsSource = `
      precision mediump float;
      uniform vec2 u_resolution;
      uniform float u_time;

      // Distance estimation for smooth octahedron
      float sdOctahedron(vec3 p, float s) {
        p = abs(p);
        return (p.x + p.y + p.z - s) * 0.57735027;
      }

      mat2 rotate2d(float angle) {
        return mat2(cos(angle), -sin(angle), sin(angle), cos(angle));
      }

      void main() {
        vec2 uv = (gl_FragCoord.xy - 0.5 * u_resolution.xy) / min(u_resolution.x, u_resolution.y);
        
        vec3 ro = vec3(0.0, 0.0, 3.5);
        vec3 rd = normalize(vec3(uv, -1.0));
        
        float t = 0.0;
        float d = 0.0;
        
        // Gentle organic drift
        vec3 p_drift = vec3(sin(u_time * 0.15) * 0.2, cos(u_time * 0.12) * 0.15, 0.0);
        
        for (int i = 0; i < 28; i++) {
          vec3 p = ro + rd * t - p_drift;
          p.xy = rotate2d(u_time * 0.08) * p.xy;
          p.xz = rotate2d(u_time * 0.05) * p.xz;
          
          d = sdOctahedron(p, 1.35);
          if (d < 0.001 || t > 8.0) break;
          t += d;
        }

        // Earthy sepia tone palette: #d8cebe / #847666 / #f5efe6
        vec3 baseColor = vec3(0.96, 0.937, 0.902); // #f5efe6
        vec3 accentSand = vec3(0.847, 0.808, 0.745); // #d8cebe
        vec3 deepEarth = vec3(0.518, 0.463, 0.4); // #847666
        
        float glow = clamp(1.0 / (1.0 + t * t * 0.15), 0.0, 1.0);
        vec3 color = mix(baseColor, accentSand, glow * 0.65);
        
        // Edge lighting
        if (t < 8.0) {
          color = mix(color, deepEarth, 0.12);
        }

        float alpha = clamp(glow * 0.45, 0.0, 0.35);
        gl_FragColor = vec4(color, alpha);
      }
    `;

    function createShader(gl: WebGLRenderingContext, type: number, source: string) {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    }

    const vs = createShader(gl, gl.VERTEX_SHADER, vsSource);
    const fs = createShader(gl, gl.FRAGMENT_SHADER, fsSource);
    if (!vs || !fs) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;

    const positionAttributeLocation = gl.getAttribLocation(program, 'a_position');
    const resolutionUniformLocation = gl.getUniformLocation(program, 'u_resolution');
    const timeUniformLocation = gl.getUniformLocation(program, 'u_time');

    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW
    );

    let animationFrameId: number;
    let startTime = performance.now();

    function resize() {
      if (!canvas || !gl) return;
      const width = window.innerWidth;
      const height = window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      if (canvas.width !== width * dpr || canvas.height !== height * dpr) {
        canvas.width = width * dpr;
        canvas.height = height * dpr;
        gl.viewport(0, 0, canvas.width, canvas.height);
      }
    }

    window.addEventListener('resize', resize);
    resize();

    function render(now: number) {
      if (!gl || !canvas) return;
      const time = (now - startTime) * 0.001;

      gl.useProgram(program);
      gl.enableVertexAttribArray(positionAttributeLocation);
      gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
      gl.vertexAttribPointer(positionAttributeLocation, 2, gl.FLOAT, false, 0, 0);

      gl.uniform2f(resolutionUniformLocation, canvas.width, canvas.height);
      gl.uniform1f(timeUniformLocation, time);

      gl.drawArrays(gl.TRIANGLES, 0, 6);
      animationFrameId = requestAnimationFrame(render);
    }

    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      id="bg-canvas"
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 w-full h-full opacity-60 mix-blend-multiply"
      aria-hidden="true"
    />
  );
}
