import {
    Book, Dumbbell, Users, Coffee, ShoppingCart, Car, Home,
    Heart, Code, Music, Paintbrush, Camera, Plane, Mail,
    Phone, MessageSquare, Video, FileText, Calendar as CalendarIcon,
    Utensils, GraduationCap, Briefcase, DollarSign, Gift,
    Bug, Wrench, Zap, Star, CheckCircle, Target
} from 'lucide-react';

export const getTaskIcon = (title: string, description?: string) => {
    const text = `${title} ${description || ''}`.toLowerCase();

    // Exercise & Health
    if (text.match(/exercise|workout|gym|run|jog|walk|yoga|fitness|training|sport|swim/))
        return Dumbbell;
    if (text.match(/doctor|medical|health|medicine|appointment|checkup|dentist/))
        return Heart;

    // Reading & Learning
    if (text.match(/read|book|study|learn|course|lecture|education|research|article/))
        return Book;
    if (text.match(/school|university|college|class|homework|assignment|exam|test/))
        return GraduationCap;

    // Work & Business
    if (text.match(/meeting|conference|presentation|client|project|deadline|report/))
        return Users;
    if (text.match(/work|job|business|office|task|professional/))
        return Briefcase;
    if (text.match(/code|program|develop|software|app|website/))
        return Code;
    if (text.match(/bug|debug/))
        return Bug;
    if (text.match(/fix|repair|maintain|tool/))
        return Wrench;

    // Food & Shopping
    if (text.match(/cook|recipe|meal|breakfast|lunch|dinner|eat|food|kitchen/))
        return Utensils;
    if (text.match(/shop|buy|purchase|store|grocery|market|mall/))
        return ShoppingCart;
    if (text.match(/coffee|cafe|tea|drink/))
        return Coffee;

    // Communication
    if (text.match(/call|phone|ring/))
        return Phone;
    if (text.match(/email|mail|letter|send/))
        return Mail;
    if (text.match(/message|text|chat|whatsapp|telegram/))
        return MessageSquare;
    if (text.match(/video|zoom|meet|teams|call|webinar/))
        return Video;

    // Creative & Entertainment
    if (text.match(/paint|draw|art|design|sketch|creative/))
        return Paintbrush;
    if (text.match(/music|song|play|listen|spotify|concert/))
        return Music;
    if (text.match(/photo|picture|camera|photograph|snap/))
        return Camera;

    // Travel & Transportation
    if (text.match(/travel|trip|flight|vacation|holiday|hotel|booking/))
        return Plane;
    if (text.match(/drive|car|vehicle|gas|fuel|parking/))
        return Car;

    // Finance
    if (text.match(/pay|payment|bill|money|budget|finance|bank|tax|invoice/))
        return DollarSign;

    // Personal & Home
    if (text.match(/clean|tidy|organize|laundry|home|house/))
        return Home;
    if (text.match(/gift|birthday|present|party|celebration/))
        return Gift;

    // Documents & Files
    if (text.match(/document|file|paper|form|fill|sign|write/))
        return FileText;

    // Calendar & Planning
    if (text.match(/plan|schedule|calendar|event|reminder|organize/))
        return CalendarIcon;

    // Goals & Achievements
    if (text.match(/goal|target|achieve|objective|milestone/))
        return Target;
    if (text.match(/complete|finish|done|accomplish/))
        return CheckCircle;

    // Default based on category or priority
    if (text.match(/important|urgent|critical|asap/))
        return Zap;

    // Fallback - Star for everything else
    return Star;
};

export type TaskIconType = ReturnType<typeof getTaskIcon>;
