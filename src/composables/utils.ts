


export const timestampToDatetime = (timestamp: any) => {
  if (!timestamp) return null;
  const dateObj = new Date(timestamp.seconds * 1000);
  const timeObj = new Date(timestamp.seconds * 1000);
  const dateStr = dateObj.toLocaleDateString('es-PE');
  const timeStr = timeObj.toLocaleTimeString('es-PE');
  return `${dateStr} ${timeStr}`;
};


export const getMediaFile = (fileUrl: string) => {
  if (!fileUrl) return '';
  if (fileUrl.includes('http')) return fileUrl;
  const baseUrl = import.meta.env.VITE_APP_BACKEND_URL.slice(0, -1);
  return `${baseUrl}${fileUrl}`;
}


const base64ToFile = (base64: string, filename: string): File => {
  const arr = base64.split(',');
  const mime = arr[0].match(/:(.*?);/)![1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, { type: mime });
}
export const comprimirImagenCircular = async (file: File, percentage: number) => {

  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event: any) => {
      const img = new Image();
      img.src = event.target.result;
      img.onload = () => {
        const elem = document.createElement('canvas');
        const size = Math.min(img.width, img.height) * (percentage / 100);
        elem.width = size;
        elem.height = size;
        const ctx = elem.getContext('2d');
        // Calculate the scale factor
        const scale = Math.max(size / img.width, size / img.height);
        // Calculate the top left position of the image
        const x = (size - img.width * scale) / 2;
        const y = (size - img.height * scale) / 2;
        // Dibuja un círculo en el canvas para recortar la imagen
        ctx?.beginPath();
        ctx?.arc(size / 2, size / 2, size / 2, 0, 2 * Math.PI);
        ctx?.clip();
        // dibuja la imagen en el canvas recortado
        ctx?.drawImage(img, x, y, img.width * scale, img.height * scale);
        // convertir de tipo svg a tipo file
        const data = ctx?.canvas.toDataURL('image/webp', 0.1);

        // que retorne un file
        const fileResult = base64ToFile(data as string, file.name);
        resolve(fileResult);
      };
      img.onerror = (error) => reject(error);
    };
  });
};


export const checkImageSize = (file: File) => {
  return file.size / (1024 * 1024) < 3;
}



export const comprimirImagenNormal = async (file: File, percentage: number) => {

    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event: any) => {
        const img = new Image();
        img.src = event.target.result;
        img.onload = () => {
          const elem = document.createElement('canvas');
          const width = img.width * (percentage / 100);
          const height = img.height * (percentage / 100);
          elem.width = width;
          elem.height = height;
          const ctx = elem.getContext('2d');
        // dibuja la imagen en el canvas recortado
        ctx?.drawImage(img, 0, 0, width, height);
        // convertir a webp
        const data = ctx?.canvas.toDataURL('image/webp', 0.1);

        // que retorne un file
        const fileResult = base64ToFile(data as string, file.name);
        resolve(fileResult);
      };
      img.onerror = (error) => reject(error);
    };
  });
};