interface CreateProps {
  body: any;
}
interface IndexProps {
  params: string;
  skip?: number;
  take?: number;
}
class Api {
  async create(props: CreateProps) {
    return await fetch("http://localhost:3334/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: `${JSON.stringify(props.body)}`,
    })
      .then((response) => response.json())
      .then((data) => data)
      .catch((error) => error);
  }

  async update() {}

  async show() {}

  async index(props: IndexProps) {
    return await fetch("http://localhost:3334/" + `${props.params}?skip=${props.skip || 0}&take=${props.take ||  4}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => response.json())
      .then((data) => data)
      .catch((error) => error);
  }

  async delete() {}
}

export const api = new Api();
