export interface DawaMunicipality {
    "geo_version": number,
    "bbox": number[],
    "visueltcenter": number[],
    "href": string,
    "dagi_id": string,
    "kode": string,
    "navn": string,
    "udenforkommuneinddeling": boolean,
    "regionskode": string,
    "region": {
        "href": string,
        "kode": string,
        "navn": string
    }
}

export interface Municipality {
    id: string;
    name: string;
    region: {
        id: string,
        name: string
        href: string,
    }
}

export const municipalityFromDawa = (m: DawaMunicipality): Municipality => {
    return {
        id: m.kode,
        name: m.navn,
        region: {
            id: m.region.kode,
            name: m.region?.navn,
            href: m.region?.href,
        },
    }
}

export default Municipality;