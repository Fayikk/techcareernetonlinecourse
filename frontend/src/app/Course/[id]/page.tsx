'use client'
import { useParams } from "next/navigation";
import { useAppDispatch, useAppSelector } from "../../../../lib/redux/hooks";
import { fetchCourse } from "../../../../lib/features/courseSlice";
import { useEffect } from "react";

export default function CourseDetailPage(){
    const {id} = useParams();
    const dispatch = useAppDispatch();
    const {course,isLoading} = useAppSelector(state => state.course);
    console.log("trigger id",id)

    useEffect(()=>{
        dispatch(fetchCourse(id as string))
    },[dispatch,id])



     if(isLoading){
        return <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', fontSize: '24px'}}>Loading...</div>
    }

    console.log("trigger course",course)

    if(!course){
        return <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', fontSize: '20px'}}>Course not found</div>
    }
    
    
    return(
        <div  style={{maxWidth: '1200px', margin: '0 auto', padding: '20px', fontFamily: 'Arial, sans-serif'}}>
            {/* Header Section */}
            <div style={{backgroundColor: '#ffffff', borderRadius: '8px', padding: '30px', marginBottom: '30px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)'}}>
                <h1 style={{fontSize: '32px', fontWeight: 'bold', color: '#333', marginBottom: '15px'}}>{course.title}</h1>
                <p style={{fontSize: '16px', color: '#666', lineHeight: '1.6', marginBottom: '20px'}}>{course.description}</p>
                
                <div style={{display: 'flex', gap: '30px', flexWrap: 'wrap', alignItems: 'center'}}>
                    <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
                        <span style={{fontSize: '28px', fontWeight: 'bold', color: '#28a745'}}>₺{course.price?.toFixed(2)}</span>
                    </div>
                    
                </div>
            </div>

            {/* Image Section */}
            {course.imageUrl && (
                <div style={{marginBottom: '30px', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.1)'}}>
                    <img 
                        src={course.imageUrl} 
                        alt={course.title}
                        style={{width: '100%', height: 'auto', maxHeight: '400px', objectFit: 'cover'}}
                    />
                </div>
            )}

            {/* Lessons Section */}
            <div>
                <h2 style={{fontSize: '24px', fontWeight: 'bold', color: '#333', marginBottom: '20px', paddingBottom: '10px', borderBottom: '3px solid #007bff'}}>
                    Course Lessons ({course.lessons?.length || 0})
                </h2>
                
                {course.lessons && course.lessons.length > 0 ? (
                    <div style={{display: 'grid', gap: '20px'}}>
                        {course.lessons.map((lesson: any, index: number) => (
                            <div 
                                key={lesson.id}
                                style={{
                                    backgroundColor: '#fff',
                                    border: '1px solid #e0e0e0',
                                    borderRadius: '8px',
                                    padding: '20px',
                                    boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
                                    transition: 'transform 0.2s, box-shadow 0.2s'
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = 'translateY(-2px)';
                                    e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.12)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = 'translateY(0)';
                                    e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.08)';
                                }}
                            >
                                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '12px'}}>
                                    <h3 style={{fontSize: '20px', fontWeight: '600', color: '#333', margin: '0'}}>
                                        <span style={{
                                            backgroundColor: '#007bff',
                                            color: '#fff',
                                            borderRadius: '50%',
                                            width: '30px',
                                            height: '30px',
                                            display: 'inline-flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            marginRight: '10px',
                                            fontSize: '14px'
                                        }}>
                                            {index + 1}
                                        </span>
                                        {lesson.title}
                                    </h3>
                                    <span style={{fontSize: '12px', color: '#999', whiteSpace: 'nowrap', marginLeft: '10px'}}>
                                        {new Date(lesson.createdDate).toLocaleDateString('tr-TR')}
                                    </span>
                                </div>
                                
                                <p style={{fontSize: '15px', color: '#555', lineHeight: '1.6', marginBottom: '12px', paddingLeft: '40px'}}>
                                    {lesson.content}
                                </p>
                                
                                {lesson.videoUrl && (
                                    <div style={{paddingLeft: '40px'}}>
                                        <a 
                                            href={lesson.videoUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            style={{
                                                display: 'inline-flex',
                                                alignItems: 'center',
                                                gap: '8px',
                                                padding: '8px 16px',
                                                backgroundColor: '#007bff',
                                                color: '#fff',
                                                textDecoration: 'none',
                                                borderRadius: '4px',
                                                fontSize: '14px',
                                                fontWeight: '500',
                                                transition: 'background-color 0.2s'
                                            }}
                                            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#0056b3'}
                                            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#007bff'}
                                        >
                                            ▶ Watch Video
                                        </a>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                ) : (
                    <div style={{
                        textAlign: 'center',
                        padding: '40px',
                        backgroundColor: '#ffffff',
                        borderRadius: '8px',
                        color: '#666'
                    }}>
                        No lessons available yet
                    </div>
                )}
            </div>
        </div>
    )
}