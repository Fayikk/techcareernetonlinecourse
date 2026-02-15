export interface CourseDTO{
    title:string,
    description:string,
    price:number,
    imageUrl:string,
    id:string,
    lessons:LessonDTO[]
}


export interface LessonDTO{
    title:string,
    content:string,
    videoUrl:string,
    courseId:string,
    id:string,
}