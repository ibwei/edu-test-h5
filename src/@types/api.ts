// 接口业务状态,0:成功,1:错误
interface HttpResponse<T> {
  status: number;
  data: {
    resultCode: 0 | 1;
    resultMessage: string;
    data: T;
  };
}

export { HttpResponse };
