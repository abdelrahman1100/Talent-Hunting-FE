import ApiService from './ApiService'
export async function apiGetDepartments() {
    return ApiService.fetchDataWithAxios({
        url: '/departments',
        method: 'get',
    })
}
