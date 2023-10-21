export async function interceptor() {
  // const token = await Auth.currentSession().then((result: any) => {
  //   return result.getIdToken().getJwtToken();
  // });

  const token = "token";
  const config: RequestInit = {
    headers: {
      Authorization: token,
      "Content-Type": "application/json",
    },
  };

  return config;
}