
export const commonTasks = [
    'Buy groceries',
    'Call Mom',
    'Call Dad',
    'Team Meeting',
    'Doctor Appointment',
    'Dentist Appointment',
    'Pay Bills',
    'Pay Rent',
    'Workout',
    'Read a book',
    'Clean the house',
    'Laundry',
    'Walk the dog',
    'Water plants',
    'Grocery shopping',
    'Prepare presentation',
    'Submit report',
    'Reply to emails',
    'Charge laptop',
    'Update software',
    'Check fast tasks',
];

export const getSuggestions = (input: string): string[] => {
    if (!input || input.trim().length === 0) return [];

    const lowerInput = input.toLowerCase();

    // Filter common tasks that include the input
    return commonTasks
        .filter(task => task.toLowerCase().includes(lowerInput))
        .slice(0, 5); // Return top 5 matches
};
