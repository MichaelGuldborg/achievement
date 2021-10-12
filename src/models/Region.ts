export interface DawaRegion {
    "kode": "1081",
    "navn": "Region Nordjylland",
    "nuts2": "DK05",
    "href": "https://dawa.aws.dk/regioner/1081"
}

export interface Region {
    id: string;
    name: string;
    href: string;
}

export const regionFromDawa = (m: DawaRegion): Region => {
    return {
        id: m.kode,
        name: m.navn,
        href: m.href,
    }
}

export default Region;