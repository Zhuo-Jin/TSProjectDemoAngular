export interface IContact
{
    Id:number,
    Name:string,
    Mobile:string,
    Email:string,
    ImageNumber:number,
}

export interface IProject
{
    Id:number,
    ProjectName:string,
    ProjectDescription:string,
    CreateTime:string,
    CloseTime:string,
    ImageNumber:number,
    ProjectContactItems : IProjectContactItem[],
}

export interface IProjectContactItem
{
    Id:number,
    ProjectId:number,
    ContactId:number,
    Contact:IContact

}