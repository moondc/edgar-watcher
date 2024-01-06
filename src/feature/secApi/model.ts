export interface RecentFiling {
    accessionNumber: string[],
    filingDate: string[],
    reportDate: string[],
    acceptanceDateTime: string[],
    act: string[],
    form: string[],
    fileNumber: string[],
    filmNumber: string[],
    items: string[],
    size: number[],
    isXBRL: number[],
    isInlineXBRL: number[],
    primaryDocument: string[],
    primaryDocDescription: string[]
}

export interface Filing {
    accessionNumber: string,
    filingDate: string,
    reportDate: string,
    acceptanceDateTime: string,
    act: string,
    form: string,
    fileNumber: string,
    filmNumber: string,
    items: string,
    size: number,
    isXBRL: number,
    isInlineXBRL: number,
    primaryDocument: string,
    primaryDocDescription: string
}

export interface Submission {
    cik: '1411579',
    entityType: 'operating',
    sic: '7830',
    sicDescription: 'Services-Motion Picture Theaters',
    insiderTransactionForOwnerExists: 1,
    insiderTransactionForIssuerExists: 1,
    name: 'AMC ENTERTAINMENT HOLDINGS, INC.',
    tickers: ['AMC'],
    exchanges: ['NYSE'],
    ein: '260303916',
    description: '',
    website: '',
    investorWebsite: '',
    category: 'Large accelerated filer',
    fiscalYearEnd: '1231',
    stateOfIncorporation: 'DE',
    stateOfIncorporationDescription: 'DE',
    addresses: {
        mailing: {
            street1: 'ONE AMC WAY',
            street2: '11500 ASH STREET',
            city: 'LEAWOOD',
            stateOrCountry: 'KS',
            zipCode: '66211',
            stateOrCountryDescription: 'KS'
        },
        business: {
            street1: 'ONE AMC WAY',
            street2: '11500 ASH STREET',
            city: 'LEAWOOD',
            stateOrCountry: 'KS',
            zipCode: '66211',
            stateOrCountryDescription: 'KS'
        }
    },
    phone: '913-213-2000',
    flags: '',
    formerNames: [],
    filings: {
        recent: RecentFiling,
        files: [[Object]]
    }
}
