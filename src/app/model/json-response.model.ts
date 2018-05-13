export class JsonResponse<T>{
    status: number;
    message: string;
    response: T;
}