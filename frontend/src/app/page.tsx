'use client'

import Image from "next/image";
import styles from "./page.module.css";
import { useAppDispatch, useAppSelector } from "../../lib/redux/hooks";
import { useEffect } from "react";
import { fetchCourses } from "../../lib/features/courseSlice";
import CourseCard from "./Components/CourseCard";

export default function Home() {

  const dispatch = useAppDispatch();
  const {isLoading,courses} = useAppSelector(state => state.course)

  useEffect(()=>{
    dispatch(fetchCourses())
  },[dispatch])



  if(isLoading){
    return <div>...Loading</div>
  }


  return (
    <>
    <main style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f9fafb 0%, #eff6ff 50%, #faf5ff 100%)',
      padding: '64px 24px'
    }}>
      <div style={{
        maxWidth: '1280px',
        margin: '0 auto'
      }}>
        
        {/* Header Section */}
        <div style={{
          marginBottom: '48px',
          textAlign: 'center'
        }}>
          <h1 style={{
            fontSize: 'clamp(32px, 5vw, 48px)',
            fontWeight: 'bold',
            background: 'linear-gradient(90deg, #4f46e5, #9333ea, #ec4899)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            marginBottom: '16px'
          }}>
            Discover Your Next Course
          </h1>
          <p style={{
            color: '#6b7280',
            fontSize: '18px',
            maxWidth: '672px',
            margin: '0 auto'
          }}>
            Expand your skills with expert-led courses designed for real-world success
          </p>
        </div>

        {/* Course Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '32px'
        }}>
          {courses && courses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </div>
    </main>
    </>
  );
}
