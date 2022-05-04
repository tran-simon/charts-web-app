import { convertDocValueHardcode, convertDocSectionHardcode } from './hardcode';
import startCase from 'lodash/startCase'

export type DocValue = {
  name: string,
  type: string,
  description: string,
  options?: string[]
  path: string[]
  _isDocValue: true
  _exclude?: boolean
}

export type DocSection = {
  name: string,
  children: DocOption[],
  path: string[]
  array?: boolean
  _isDocSection: true,
  _exclude?: boolean
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


const mapOptions = (divs: any[], path: string[]): { docOptions: DocOption[], stringPaths: string[] } =>{
  let stringPaths: string [] = [];
  const res =  divs.map((entry) => {
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

    const res = convertDocValueHardcode({
      name,
      type,
      description,
      options,
      _isDocValue: true,
      path: newPath
    });

    stringPaths.push(res.path.join('.'))

    if (divs.length) {
      const {docOptions, stringPaths: newStringPaths} = mapOptions(divs, newPath);
      stringPaths.push(...newStringPaths)
      return convertDocSectionHardcode({
        name: res.name,
        children: docOptions,
        _isDocSection: true,
        path: newPath,
        array: !!res.type
      }, stringPaths)
    }

    return res
  }).filter((value)=>{
    if (!value || value._exclude) {
      return false
    }
    if (isDocSection(value)) {
      return value.name != null && value.children?.length;
    }
    else{
      return value.type != null && value.name != null;
    }
  });

  return {
    docOptions: res,
    stringPaths
  }
}

const convert = (jsonData: any, name: string): {
  convertedCode: any,
  intl: Record<string, string>
} => {
  let list: any[] = jsonData[0]?.children || [];

  if (jsonData.length > 1) {
    return convert(jsonData.filter((v: any)=>v.tagName === 'div'), name)
  }

  const {docOptions, stringPaths} = mapOptions(list.filter((o) => o.tagName === 'div'), [name]);

  const intl = stringPaths.reduce((acc, curr) => {
    const lastDotIndex = curr.lastIndexOf('.');
    if (lastDotIndex !== -1) {
      acc[curr] = startCase(curr.slice(lastDotIndex));
    }

    return acc;
  }, {} as Record<string, string>);

  intl[name] = startCase(name);

  return {
    convertedCode: docOptions.reduce((acc, curr) => {
      acc[curr.name] = curr;
      return acc;
    }, {} as any),
    intl
  };
}

export default convert
