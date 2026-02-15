'use client'
import { useState } from "react";
import { CourseDTO } from "../../../lib/type";
import { useRouter } from "next/navigation";

export default function CourseCard({course}:{course:CourseDTO}){
    const [isHovered,setIsHovered] = useState(false)
    const [isImageHovered,setIsImageHovered] = useState(false)
    const [isButtonHovered,setIsButtonHovered] = useState(false)
    const router = useRouter();




    return(

  <div 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        position: 'relative',
        background: '#ffffff',
        borderRadius: '16px',
        boxShadow: isHovered 
          ? '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
          : '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        border: isHovered ? '1px solid #c7d2fe' : '1px solid rgba(229, 231, 235, 0.5)',
        overflow: 'hidden',
        transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
        transform: isHovered ? 'translateY(-8px)' : 'translateY(0)'
      }}
    >
      
      {/* Image Container */}
      <div 
        onMouseEnter={() => setIsImageHovered(true)}
        onMouseLeave={() => setIsImageHovered(false)}
        style={{
          position: 'relative',
          width: '100%',
          height: '224px',
          overflow: 'hidden',
          background: 'linear-gradient(135deg, #e0e7ff, #ede9fe)'
        }}
      >
        <img
          src={course.imageUrl}
          alt={course.title}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.7s cubic-bezier(0.4, 0, 0.2, 1)',
            transform: isImageHovered ? 'scale(1.1) rotate(1deg)' : 'scale(1) rotate(0deg)'
          }}
        />
        
        {/* Gradient Overlay */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to top, rgba(0,0,0,0.6), rgba(0,0,0,0.2), transparent)',
          opacity: isImageHovered ? 0.5 : 0.7,
          transition: 'opacity 0.5s'
        }}></div>
        
        {/* Price Badge */}
        <div style={{
          position: 'absolute',
          top: '16px',
          right: '16px',
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(10px)',
          padding: '8px 16px',
          borderRadius: '9999px',
          boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
        }}>
          <span style={{
            fontSize: '18px',
            fontWeight: 'bold',
            background: 'linear-gradient(90deg, #4f46e5, #9333ea)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            ${course.price}
          </span>
        </div>
      </div>

      {/* Content Container */}
      <div style={{
        padding: '24px'
      }}>
        
        {/* Title */}
        <h2 style={{
          fontSize: '20px',
          fontWeight: 'bold',
          color: isHovered ? '#4f46e5' : '#111827',
          transition: 'color 0.3s',
          marginBottom: '16px',
          lineHeight: '1.4',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden'
        }}>
          {course.title}
        </h2>

        {/* Description */}
        <p style={{
          color: '#6b7280',
          fontSize: '14px',
          lineHeight: '1.6',
          marginBottom: '16px',
          minHeight: '60px',
          display: '-webkit-box',
          WebkitLineClamp: 3,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden'
        }}>
          {course.description}
        </p>

        {/* Divider */}
        <div style={{
          borderTop: '1px solid #f3f4f6',
          paddingTop: '16px'
        }}>
          
          {/* Action Button */}
          <button 
            onMouseEnter={() => setIsButtonHovered(true)}
            onMouseLeave={() => setIsButtonHovered(false)}
            onClick={()=> router.push(`Course/${course.id}`)}
            style={{
              width: '100%',
              padding: '12px 24px',
              fontSize: '14px',
              fontWeight: '600',
              borderRadius: '12px',
              background: 'linear-gradient(90deg, #4f46e5, #9333ea)',
              color: '#ffffff',
              border: 'none',
              cursor: 'pointer',
              boxShadow: isButtonHovered 
                ? '0 10px 15px -3px rgba(79, 70, 229, 0.4)'
                : '0 4px 6px -1px rgba(79, 70, 229, 0.3)',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              transform: isButtonHovered ? 'scale(1.02)' : 'scale(1)'
            }}
          >
            Explore Course →
          </button>

        </div>
      </div>

      {/* Hover Effect Border */}
      <div style={{
        position: 'absolute',
        inset: 0,
        borderRadius: '16px',
        background: 'linear-gradient(145deg, rgba(99, 102, 241, 0.1), rgba(168, 85, 247, 0.1))',
        opacity: isHovered ? 1 : 0,
        transition: 'opacity 0.5s',
        pointerEvents: 'none'
      }}></div>
    </div>


    )
}