interface IUserDataResponse {
  id: string
  username: string
  email: string
  registration_date: string
  rating: number
}

export const API_URL: string = `https://5ebbb8e5f2cfeb001697d05c.mockapi.io/users`

export const checkResponse = <T>(res: Response): Promise<T> => {
  return res.ok ? res.json() : res.json().then(() => Promise.reject(res.status))
}

export const apiRequest = <T>(
  url: string,
  options: RequestInit
): Promise<T> => {
  return fetch(url, options).then((res) => checkResponse<T>(res))
}

export const getUserDataApi = () => {
  return apiRequest<IUserDataResponse[]>(`${API_URL}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json;charger=utf-8",
    },
  })
}
