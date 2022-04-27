import { DocSection, DocValue } from './convert';

export const stringifyHardcode: Record<string, string | undefined> = {
  // TODO(https://github.com/tran-simon/pretty-charts/issues/2)
  'xaxis.crosshairs.width': 'new optionModel.NumberOptionField()',

  'yaxis.axisTicks.borderType': undefined,
  'yaxis.range': undefined,
  'yaxis.position': undefined,
  'yaxis.tooltip.enabled': 'new optionModel.BoolOptionField()',
  'yaxis.tooltip.offsetX': 'new optionModel.NumberOptionField()'
}

export const convertDocValueHardcode = (docValue: DocValue)=>{

  return docValue;
}

export const docSectionHardcode = (docSection: DocSection)=>{
  if (docSection.path?.join('.') === 'fill.Pattern') {
    docSection.name = 'pattern';
    docSection.path = ['fill', 'pattern'];
  }

  return docSection
}
