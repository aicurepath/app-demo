import { Link } from 'react-router-dom';

export default function AuthSelectionPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="text-center text-3xl font-bold text-gray-900">Welcome to aiCurePath</h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Choose how you want to continue
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 space-y-6">
          <Link
            to="/login"
            className="w-full flex justify-center items-center py-3 px-4 rounded-xl bg-primary-500 text-white hover:bg-primary-600 transition-colors"
          >
            <span className="text-xl mr-3">👤</span>
            <div className="text-left">
              <div className="font-medium">Continue as User</div>
              <div className="text-sm opacity-90">Get personalized health advice</div>
            </div>
          </Link>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">or</span>
            </div>
          </div>

          <Link
            to="/practitioner/login"
            className="w-full flex justify-center items-center py-3 px-4 rounded-xl bg-white border-2 border-primary-500 text-primary-500 hover:bg-primary-50 transition-colors"
          >
            <span className="text-xl mr-3">👨‍⚕️</span>
            <div className="text-left">
              <div className="font-medium">Continue as Practitioner</div>
              <div className="text-sm opacity-90">Manage your practice</div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}