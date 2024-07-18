"use client";
import { useEffect } from 'react';
// import { useRouter } from 'next/router';
import { auth } from "@/app/services/firebase";
import { useRouter } from 'next/navigation';

const ErrorPage = ({ statusCode }: { statusCode: number }) => {
  const router = useRouter();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (!user) {
        router.push('/');
      }
    });
  }, [statusCode]);

  return (
    <div>
      <h1>{statusCode}</h1>
      <p>{statusCode === 404 ? 'Page not found' : 'An error occurred'}</p>
    </div>
  );
};

ErrorPage.getInitialProps = ({ res, err }: { res: any, err: any }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default ErrorPage;