export type DocValue = {
  name: string,
  type: string,
  description: string,
  options?: string[]
  path: string[]
  _isDocValue: true
}

type DocSection = {
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

const mapOptions = (divs: any[], path: string[]):DocOption[]=>{
  return divs.map((entry) => {
    const children: any[] = entry?.children || []

    const h3 = children.find((v) => v.tagName === 'h3');
    const [name, type] = (h3?.children[0]?.content as string)?.split(': ') || []

    const p = children.find((v) => v.tagName === 'p');
    const description = p?.children?.find((v: any) => v.type === 'text')?.content?.trim();

    const ul = children.find((v) => v.tagName === 'ul')

    const options = ul?.children?.map((v: any) => {
      return v?.children[0]?.content
    })

    const divs = children?.filter((v) => v.tagName === 'div') || [];
    const newPath = [...path, name]
    if (divs.length) {
      return {
        name,
        children: mapOptions(divs, newPath),
        _isDocSection: true,
        path: newPath
      }
    }

    return {
      name,
      type: type?.toLowerCase(),
      description,
      options,
      _isDocValue: true,
      path: newPath
    };
  });
}

export default (jsonData: any, name: string) => {
  const list: any[] = jsonData[0]?.children;

  const mappedOptions = mapOptions(list.filter((o) => o.tagName === 'div'), [name])

  return mappedOptions.reduce((acc, curr)=>{
    acc[curr.name] = curr
    return acc
  }, {} as any)
}
