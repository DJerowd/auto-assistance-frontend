import api from '../Services/api';

export async function loadBlobImage(vehicle) {
    try {
        const imageResponse = await api.get(vehicle.imageUrl, { responseType: 'blob' });
        const resolvedUrl = URL.createObjectURL(imageResponse.data);
        return { ...vehicle, image: resolvedUrl };
    } catch {
        return { ...vehicle, image: '/default-vehicle.png' };
    }
}