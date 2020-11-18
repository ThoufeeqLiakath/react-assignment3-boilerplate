export default class FilterModel
{
    key:number;
    endPoints:string;
    sources:string;
    keywords:string;
    category:string;
    country:string;
    page:number;
    slider:number;
    constructor(
        endPoints:string,
        sources:string,
        keywords:string,
        category:string,
        country:string,
        page:number,
        slider:number)
    {
        this.key=Math.random();
        this.endPoints=endPoints;
        this.sources=sources;
        this.keywords=keywords;
        this.category=category;
        this.country=country;
        this.page=page;
        this.slider=slider;

    }
}