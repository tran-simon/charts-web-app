import path from 'path';

const filesList = [
  [path.resolve(__dirname, 'testResources/annotations.html'), 'annotations'],
  [path.resolve(__dirname, 'testResources/fill.html'), 'fill'],
  [path.resolve(__dirname, 'testResources/markers.html'), 'markers'],
  [path.resolve(__dirname, 'testResources/noData.html'), 'noData'],
  [path.resolve(__dirname, 'testResources/stroke.html'), 'stroke'],
  [path.resolve(__dirname, 'testResources/title.html'), 'title'],
  [path.resolve(__dirname, 'testResources/xaxis.html'), 'xaxis'],
  [path.resolve(__dirname, 'testResources/yaxis.html'), 'yaxis'],
]

export const testAll = (fn: (file: string, name: string) => Promise<void>) => {
  return async () => {
    await Promise.all(filesList.map(([file, name]) => fn(file, name)));
  };
};
