export const getTime = (time) => {
  return Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2);
};

export const getRandomElementFromArray = (arrayName) => {
  return Math.floor(Math.random() * arrayName.length);
};

export const getDominantColor = (imageUrl) => {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      canvas.width = 50;
      canvas.height = 50;
      ctx.drawImage(img, 0, 0, 50, 50);
      const imageData = ctx.getImageData(0, 0, 50, 50).data;

      let sumR = 0,
        sumG = 0,
        sumB = 0,
        count = 0;
      for (let i = 0; i < imageData.length; i += 4) {
        const r = imageData[i];
        const g = imageData[i + 1];
        const b = imageData[i + 2];
        const a = imageData[i + 3];
        if (a > 128) {
          sumR += r;
          sumG += g;
          sumB += b;
          count++;
        }
      }

      const avgR = Math.round(sumR / count);
      const avgG = Math.round(sumG / count);
      const avgB = Math.round(sumB / count);

      resolve({
        rgb: `rgb(${avgR}, ${avgG}, ${avgB})`,
        values: `${avgR} ${avgG} ${avgB}`,
      });
    };
    img.onerror = () => {
      resolve({
        rgb: "rgb(255, 255, 255)",
        values: "255 255 255",
      });
    };
    img.src = imageUrl;
  });
};
