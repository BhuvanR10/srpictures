import { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SiteLayout from './components/SiteLayout';
import ScrollToTop from './components/ScrollToTop';
import ErrorBoundary from './components/ErrorBoundary';
import PageLoader from './components/PageLoader';

// Route-based code splitting for production grade performance
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Services = lazy(() => import('./pages/Services'));
const CaseStudies = lazy(() => import('./pages/CaseStudies'));
const Categories = lazy(() => import('./pages/Categories'));
const Project = lazy(() => import('./pages/Project'));
const Pricing = lazy(() => import('./pages/Pricing'));
const Contact = lazy(() => import('./pages/Contact'));
const Blog = lazy(() => import('./pages/Blog'));
const BlogPost = lazy(() => import('./pages/BlogPost'));
const Licenses = lazy(() => import('./pages/Licenses'));
const Changelog = lazy(() => import('./pages/Changelog'));
const StyleGuide = lazy(() => import('./pages/StyleGuide'));
const Protected = lazy(() => import('./pages/Protected'));
const NotFound = lazy(() => import('./pages/NotFound'));

export default function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <ScrollToTop />
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route
              path="/template-info/style-guide"
              element={
                <div className="style-guide-body">
                  <StyleGuide />
                </div>
              }
            />
            <Route path="/401" element={<Protected />} />
            <Route element={<SiteLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<Services />} />
              <Route path="/case-studies" element={<CaseStudies />} />
              <Route path="/categories" element={<Categories />} />
              <Route path="/project/:slug" element={<Project />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog-post/:slug" element={<BlogPost />} />
              <Route path="/template-info/licenses" element={<Licenses />} />
              <Route path="/template-info/changelog" element={<Changelog />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </ErrorBoundary>
  );
}
