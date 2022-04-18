const commonRegexStr: string = `[A-Za-z0-9_]+`;
const argsRegexStr: string = commonRegexStr;
const actionRegexStr: string = commonRegexStr + `(\(` + argsRegexStr + `\))?`;
const arglessActionRegexStr: string = commonRegexStr + `(\(\))?`;
const actionMsgRegexStr: string = `action\(` + actionRegexStr + `\)`;

export namespace RegExps {
    export const actionMsgSyntax: RegExp = new RegExp(actionMsgRegexStr);
    export const actionSyntax: RegExp = new RegExp(actionRegexStr)
    export const arglessActionSyntax: RegExp = new RegExp(arglessActionRegexStr)
};

