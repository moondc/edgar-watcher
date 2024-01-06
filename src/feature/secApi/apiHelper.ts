import { Filing, RecentFiling } from "./model";

const fixFilingObjectAndSort = (filings: RecentFiling): Filing[] => {
    const result = [];
    for (let i = 0; i < filings.acceptanceDateTime.length; i++) {
        const filing: Filing = {
            accessionNumber: filings.accessionNumber[i],
            filingDate: filings.filingDate[i],
            reportDate: filings.reportDate[i],
            acceptanceDateTime: filings.acceptanceDateTime[i],
            act: filings.act[i],
            form: filings.form[i],
            fileNumber: filings.fileNumber[i],
            filmNumber: filings.filmNumber[i],
            items: filings.items[i],
            size: filings.size[i],
            isXBRL: filings.isXBRL[i],
            isInlineXBRL: filings.isInlineXBRL[i],
            primaryDocument: filings.primaryDocument[i],
            primaryDocDescription: filings.primaryDocDescription[i]
        }
        result.push(filing);

        sortFilingObject(result);
    }
    return result;
}

const sortFilingObject = (filings: Filing[]) => {
    filings.sort((a, b) => {
        const dateA = new Date(a.acceptanceDateTime).getTime();
        const dateB = new Date(b.acceptanceDateTime).getTime();
        return dateB - dateA;
    })
}


export default { fixFilingObjectAndSort }