import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { AppContext } from '../../context/AppContext';
import { toast } from 'react-toastify';
import Loading from '../../components/student/Loading';

const EditCourse = () => {
  const { id } = useParams();
  const { backendUrl, getToken } = useContext(AppContext);
  const [course, setCourse] = useState(null);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const token = await getToken();
        const { data } = await axios.get(`${backendUrl}/api/educator/course/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (data.success) {
          setCourse(data.course);
        } else {
          toast.error('Failed to load course.');
        }
      } catch (err) {
        console.error(err);
        toast.error(err.message || 'Something went wrong');
      }
    };

    fetchCourse();
  }, [id]);

  if (!course) return <Loading />;

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Edit Course: {course.courseTitle}</h1>
      {/* Add your course edit form here */}
    </div>
  );
};

export default EditCourse;
