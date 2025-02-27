import { Link } from 'react-router-dom';

function DepartmentStats() {
    const departments = [
        'ECE', 'EEE', 'IT', 'ADS', 'AIML', 'CSE'
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            {departments.map(department => (
                <Link
                    key={department}
                    to={`/department-events/${department}`}
                    className="bg-blue-100 p-6 rounded-lg text-center hover:bg-blue-200 transition-colors"
                >
                    <h4 className="text-xl font-semibold text-blue-800">{department}</h4>
                </Link>
            ))}
        </div>
    );
}

export default DepartmentStats;