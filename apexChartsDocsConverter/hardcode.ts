import { DocSection, DocValue } from './convert';
import set from 'lodash/set'

export const stringifyHardcode: Record<string, string | undefined> = {

}

const pathsToExclude = [
  'xaxis.axisBorder.width',
  'xaxis.axisBorder.height',
  'yaxis.axisTicks.borderType',
  'yaxis.range',
  'yaxis.position'
]

export const convertDocValueHardcode = (docValue: DocValue)=>{
  const stringPath = docValue.path?.join('.');

  if (pathsToExclude.includes(stringPath)) {
    return {
      ...docValue,
      _exclude: true
    }
  }

  if (stringPath === 'xaxis.crosshairs.width') {
    // TODO(https://github.com/tran-simon/pretty-charts/issues/2)
    return {
      ...docValue,
      type: 'number',
      options: undefined
    };
  }

  if (stringPath === 'yaxis.tooltip.enabled') {
    return {
      ...docValue,
     type: 'boolean'
    };
  }
  if (stringPath === 'yaxis.tooltip.offsetX') {
    return {
      ...docValue,
      type: 'number'
    }
  }


  return docValue;
}

export const docSectionHardcode = (docSection: DocSection)=>{
  const stringPath = docSection.path?.join('.');

  if (pathsToExclude.includes(stringPath)) {
    return {
      ...docSection,
      _exclude: true
    }
  }

  if (stringPath === 'fill.Pattern') {
    docSection.name = 'pattern';
    docSection.path = ['fill', 'pattern'];
  }

  if(stringPath === 'xaxis.axisBorder') {
    docSection.children.push({
      name: 'strokeWidth',
      type: 'number',
      description: 'The stroke width',
      path: ['xaxis', 'axisBorder', 'strokeWidth'],
      _isDocValue: true
    })
  }

  return docSection
}
