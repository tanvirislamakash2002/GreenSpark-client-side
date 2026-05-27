'use server';

import { statsService } from '@/services/stats.service';

export const getPlatformStats = async () => {
    return await statsService.getPlatformStats();
};