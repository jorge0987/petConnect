interface CreateProps {
  body: any;
}
interface RegisterProps {
  params: string;
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

  async register(props: RegisterProps) {
    return await fetch("http://localhost:3334/" + props.params, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: `${JSON.stringify(props.body)}`,
    })
      .then((response) => response.json())
      .then((data) => data)
      .catch((error) => error);
  }

  async update() {}

  async show() {}

  async index(props: IndexProps,  userId?: boolean) {
    return await fetch("http://localhost:3334/" + `${props.params}${userId ? '/feed/' + localStorage.getItem('userId') : ''}?skip=${props.skip || 0}&take=${props.take ||  4}`, {
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
  
  async getAnimalsByInstitution() {
    return await fetch(`http://localhost:3334/animal/user/${localStorage.getItem('userId')}`, {
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

  async adotarAnimal(animalId: string) {
    return await fetch(`http://localhost:3334/animal/adotar/${animalId}`, {
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

  async listInteresseByAnimal(animalId: string) {
    return await fetch(`http://localhost:3334/user/interesse/list/${animalId}`, {
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

  async addInteresse(animalId: string) {
    return await fetch(`http://localhost:3334/user/interesse/${localStorage.getItem('userId')}/${animalId}`, {
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
}

export const api = new Api();
