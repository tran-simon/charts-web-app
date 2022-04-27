import { convertDocValueHardcode, docSectionHardcode } from './hardcode';

export type DocValue = {
  name: string,
  type: string,
  description: string,
  options?: string[]
  path: string[]
  _isDocValue: true
}

export type DocSection = {
  name: string,
  children: DocOption[],
  path: string[]
  _isDocSection: true
}

type DocOption = DocValue | DocSection

export const isDocValue = (option: DocValue | DocSection): option is DocValue=>{
  return typeof option === 'object' && '_isDocValue' in option;
}

export const isDocSection = (option: DocValue | DocSection): option is DocSection=>{
  return typeof option === 'object' && '_isDocSection' in option;
}

export const numberOrStringTypes = [
  'string | number',
  'number | string',
  'string || number',
  'number || string',
]

const validTypes = [
  'string',
  'number',
  'boolean',
  'function'

  // TODO(https://github.com/tran-simon/pretty-charts/issues/6): support color
]

const mapOptions = (divs: any[], path: string[]):DocOption[]=>{
  return divs.map((entry) => {
    const children: any[] = entry?.children || []

    const h3Children = children.find((v) => v.tagName === 'h3')?.children || [];
    let [name, type] = (h3Children[0]?.content as string)?.split(': ') || []
    name = name?.replace(/[^a-zA-Z]+/g, '');

    type = type?.toLowerCase();
    if (type) {
      if (numberOrStringTypes.includes(type)) {
        type = 'string | number';
      }
      else if (type === 'String || Array') {
        type = 'string | string[]';
      } else if (!validTypes.includes(type)) {
        type = 'any';
      }
    }

    const p = children.find((v) => v.tagName === 'p');
    const description = p?.children?.find((v: any) => v.type === 'text')?.content?.trim();

    const ul = children.find((v) => v.tagName === 'ul')

    const options = ul?.children?.filter((v: any)=>v.tagName === 'li')?.map((v: any) => {
      const child = v?.children ? v?.children[0] : undefined;
      if (child?.tagName === 'pre') {
        /* To fix a bug for xaxis.tickPlacement */
        const res = child.children[0]?.children[0]?.content?.split(': ') || []
        return res[1]?.replace(/[^a-zA-Z]+/g, '');
      }

      const colonIndex = child?.content?.indexOf(':')
      if (colonIndex != null && colonIndex >= 0) {
        /* To fix a bug for stroke.curve*/
        return child.content.slice(0, colonIndex);
      }
      return child?.content
    });

    const divs = children?.filter((v) => {
      if (v.tagName !== 'div') {
        return false
      }
      /* Filter only divs that do not have class="tip" (markers.onClick) */
      if ((v.attributes || []).findIndex((i: any) => i.value === 'tip') !== -1) {
        return false
      }
      return true
    }) || [];

    const newPath = [...path, name]
    if (divs.length) {
      return docSectionHardcode({
        name,
        children: mapOptions(divs, newPath),
        _isDocSection: true,
        path: newPath
      })
    }

    return convertDocValueHardcode({
      name,
      type,
      description,
      options,
      _isDocValue: true,
      path: newPath
    });
  });
}

const convert = (jsonData: any, name: string): any => {
  let list: any[] = jsonData[0]?.children || [];

  if (jsonData.length > 1) {
    return convert(jsonData.filter((v: any)=>v.tagName === 'div'), name)
  }

  const mappedOptions = mapOptions(list.filter((o) => o.tagName === 'div'), [name])

  return mappedOptions.reduce((acc, curr)=>{
    acc[curr.name] = curr
    return acc
  }, {} as any)
}

export default convert
