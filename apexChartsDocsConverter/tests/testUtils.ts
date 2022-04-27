const filesList = [
  ['tests/annotations.html', 'annotations'],
  ['tests/fill.html', 'fill'],
  ['tests/markers.html', 'markers'],
  ['tests/noData.html', 'noData'],
  ['tests/stroke.html', 'stroke'],
  ['tests/title.html', 'title'],
  ['tests/xaxis.html', 'xaxis'],
  ['tests/yaxis.html', 'yaxis'],
]

export const testAll = (fn: (file: string, name: string) => Promise<void>) => {
  return async () => {
    await Promise.all(filesList.map(([file, name]) => fn(file, name)));
  };
};
