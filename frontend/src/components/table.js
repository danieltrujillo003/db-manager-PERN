import React, { Component } from "react";

class Table extends Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      deleted: ""
    };
    this.showArticles = this.showArticles.bind(this);
    this.deleteArticle = this.deleteArticle.bind(this);
  }

  showArticles() {
    fetch("http://localhost:3000/articulos")
      .then(res => res.json())
      .then(data => {
        this.setState({ articles: data.info });
      })
      .catch(err => console.log(err));
  }

  deleteArticle(index) {
    console.log(index)
    fetch(`http://localhost:3000/articulos/${index}`, { method: "DELETE" }).then(() => {
      console.log("deleted")
    });
  }

  componentWillMount() {
    this.showArticles();
  }

  render() {
    return (
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>IVA</th>
            <th>Clasificadores</th>
            <th>Retefuente</th>
            <th>Adquirido</th>
            <th>Unidad de medida</th>
            <th>Notas</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {this.state.articles.map((article, i) => (
            <tr key={i}>
              <td>{article.nombre}</td>
              <td>{article.iva}</td>
              <td>{article.clasificadores}</td>
              <td>{article.retefuente}</td>
              <td>{article.tipo_adquirido}</td>
              <td>{article.unidades_medida}</td>
              <td>{article.notas}</td>
              <td>
                <button onClick={() => this.deleteArticle(article.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

export default Table;
