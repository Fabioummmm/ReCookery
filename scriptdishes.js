/*Download PDF*/

function downloadAsPDF() {
    window.print();
  }



  /*CURSOR EFFECT  */


  const canvas = document.getElementById('trailCanvas');
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  
  let mouseX = 0;
  let mouseY = 0;
  let isMouseMoving = false;
  let lastMouseMoveTime = 0;
  
  const trail = [];
  const trailLength = 20;
  const maxLineWidth = 3;  
  const lineColor = 'rgba(74, 101, 226, 0.8)';
  
  const mousePositions = [];
  const maxPositions = 100;
  
  ctx.shadowColor = 'rgba(74, 101, 226, 0.8)';
  ctx.shadowBlur = 10;
  
  function drawTrail() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.beginPath();
      for (let i = 0; i < trail.length; i++) {
          const point = trail[i];
          const lineWidth = (i / trail.length) * maxLineWidth;
          ctx.lineWidth = lineWidth;
          ctx.lineCap = 'round';
          ctx.strokeStyle = lineColor;
          if (i === 0) {
              ctx.moveTo(point.x, point.y);
          } else {
              ctx.lineTo(point.x, point.y);
          }
      }
      ctx.stroke();
  }
  
  function updateTrail() {
      const currentTime = new Date().getTime();
      if (isMouseMoving) {
          trail.push({ x: mouseX, y: mouseY });
          mousePositions.push({ x: mouseX, y: mouseY, timestamp: currentTime });
          if (mousePositions.length > maxPositions) {
              mousePositions.shift();
          }
          if (trail.length > trailLength) {
              trail.shift();
          }
          lastMouseMoveTime = currentTime;
      }
      if (currentTime - lastMouseMoveTime > 100) {
          trail.length = 0;
      }
      drawTrail();
  }
  
  window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      isMouseMoving = true;
  });
  
  function animate() {
      updateTrail();
      requestAnimationFrame(animate);
  }
  
  animate();
  
  window.addEventListener('resize', () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
  });
  
  function sendData() {
      fetch('http://localhost:3000/track', { // Adjust endpoint as needed
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(mousePositions)
      })
      .then(response => {
          if (!response.ok) {
              throw new Error('Network response was not ok');
          }
          console.log('Data sent successfully');
      })
      .catch(error => {
          console.error('Error sending data:', error);
      });
  }
  
  setInterval(sendData, 5000);
  
  const heatmapInstance = h337.create({
      container: document.querySelector('#heatmapContainer'),
      radius: 40,
      maxOpacity: 0.5,
      scaleRadius: true,
  });
  
  function updateHeatmap() {
      const points = mousePositions.map(pos => ({
          x: pos.x,
          y: pos.y,
          value: 1,
      }));
      
      heatmapInstance.setData({
          max: 10,
          data: points,
      });
  }
  
  setInterval(updateHeatmap, 5000);