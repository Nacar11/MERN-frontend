import InfoIcon from '@mui/icons-material/Info';
import CodeIcon from '@mui/icons-material/Code';
import PersonIcon from '@mui/icons-material/Person';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';

const AboutPage = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">About Social</h1>
        <p className="text-lg text-gray-600">
          An experimental social media platform built for learning and development
        </p>
      </div>

      {/* Main Content */}
      <div className="space-y-6">
        {/* Project Overview */}
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-600">
          <div className="flex items-start gap-3 mb-4">
            <InfoIcon className="text-green-600 mt-1" />
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                Project Overview
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Social is a full-stack social media application designed as a personal project 
                to explore and demonstrate modern web development technologies. This platform 
                allows users to create accounts, share posts with images, and interact with 
                a community in a familiar social media environment.
              </p>
            </div>
          </div>
        </div>

        {/* Technology Stack */}
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-600">
          <div className="flex items-start gap-3 mb-4">
            <CodeIcon className="text-blue-600 mt-1" />
            <div className="flex-1">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Technology Stack
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">Frontend</h3>
                  <ul className="space-y-1 text-gray-700">
                    <li>• React 19 with TypeScript</li>
                    <li>• React Router for navigation</li>
                    <li>• TanStack Query for data fetching</li>
                    <li>• Tailwind CSS for styling</li>
                    <li>• Material-UI icons</li>
                    <li>• Vite as build tool</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">Backend</h3>
                  <ul className="space-y-1 text-gray-700">
                    <li>• Node.js with Express</li>
                    <li>• MongoDB with Mongoose</li>
                    <li>• JWT authentication</li>
                    <li>• GridFS for image storage</li>
                    <li>• RESTful API architecture</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Creator Section */}
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-purple-600">
          <div className="flex items-start gap-3 mb-4">
            <PersonIcon className="text-purple-600 mt-1" />
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                About the Creator
              </h2>
              <p className="text-gray-700 leading-relaxed mb-3">
                Created by <span className="font-semibold text-gray-900">Dale Nacario</span>, 
                this project serves as a practical exploration of full-stack development, 
                focusing on building scalable and maintainable web applications using the 
                MERN stack (MongoDB, Express, React, Node.js).
              </p>
              <p className="text-gray-700 leading-relaxed">
                The goal of this project is to gain hands-on experience with modern web 
                technologies, implement best practices in software development, and create 
                a portfolio piece that demonstrates proficiency in building complete web applications.
              </p>
            </div>
          </div>
        </div>

        {/* Development Notice */}
        <div className="bg-amber-50 rounded-lg shadow-md p-6 border-l-4 border-amber-500">
          <div className="flex items-start gap-3">
            <WarningAmberIcon className="text-amber-600 mt-1" />
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                Development Notice
              </h2>
              <p className="text-gray-700 leading-relaxed mb-3">
                <span className="font-semibold">This is an experimental project for development purposes.</span> The platform 
                is continuously being developed and improved as a learning exercise, with plans 
                to transition to production use in the future as part of the ongoing experiment. 
                This will allow for real-world testing and refinement of features in a live environment.
              </p>
              <div className="bg-white rounded p-4 mt-4">
                <h3 className="font-semibold text-gray-800 mb-2">Please Note:</h3>
                <ul className="space-y-1 text-gray-700 text-sm">
                  <li>• This is a personal development project</li>
                  <li>• Features may change or be added over time</li>
                  <li>• Data may be reset during development</li>
                  <li>• Not intended for storing sensitive information</li>
                  <li>• Use for testing and demonstration purposes only</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Key Features
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h3 className="font-semibold text-gray-800">User Management</h3>
              <ul className="space-y-1 text-gray-700 text-sm">
                <li>• User registration and authentication</li>
                <li>• Secure JWT-based sessions</li>
                <li>• Profile management</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold text-gray-800">Content Creation</h3>
              <ul className="space-y-1 text-gray-700 text-sm">
                <li>• Create and edit posts</li>
                <li>• Upload multiple images (up to 5)</li>
                <li>• Delete your own posts</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold text-gray-800">User Experience</h3>
              <ul className="space-y-1 text-gray-700 text-sm">
                <li>• Responsive design for all devices</li>
                <li>• Real-time data updates</li>
                <li>• Intuitive user interface</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold text-gray-800">Technical Features</h3>
              <ul className="space-y-1 text-gray-700 text-sm">
                <li>• RESTful API architecture</li>
                <li>• Optimistic UI updates</li>
                <li>• Error handling and validation</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center py-6 text-gray-600">
          <p className="text-sm">
            © 2025 Dale Nacario. Built with React, Node.js, and MongoDB.
          </p>
          <p className="text-xs mt-2 text-gray-500">
            This is a personal project for educational and development purposes.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
