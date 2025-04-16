import { RowDataPacket } from 'mysql2';
import db from '../db/connection';
interface UserRow {
    user_id: number;
}

/**
 * Validates if user exists and returns their ID
 * @param userId Either string or number user ID
 * @returns Promise<number> Validated user ID
 * @throws Error if user doesn't exist
 */
const validateAndGetUserId = async (userId: string | number): Promise<number> => {
    const user_id = Number(userId);
    
    if (isNaN(user_id)) {
        throw new Error('Invalid user ID format');
    }

    const [rows] = await db.execute<RowDataPacket[]>(
        'SELECT user_id FROM users WHERE user_id = ?',
        [user_id]
    );

    if (!rows.length) {
        throw new Error('User not found');
    }

    return (rows[0] as UserRow).user_id;
};

export default validateAndGetUserId