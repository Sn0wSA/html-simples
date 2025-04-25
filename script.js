function buscarCEP() {
  const cep = document.getElementById('cep').value.replace(/\D/g, '');
  const resultado = document.getElementById('resultado');
  resultado.innerHTML = '';

  if (cep.length !== 8) {
    resultado.innerHTML = '<p style="color:red">CEP inválido. Digite 8 números.</p>';
    return;
  }

  fetch(`https://brasilapi.com.br/api/cep/v1/${cep}`)
    .then(res => {
      if (!res.ok) {
        throw new Error('CEP não encontrado.');
      }
      return res.json();
    })
    .then(data => {
      resultado.innerHTML = `
        <p><strong>CEP:</strong> ${data.cep}</p>
        <p><strong>Estado:</strong> ${data.state}</p>
        <p><strong>Cidade:</strong> ${data.city}</p>
        <p><strong>Bairro:</strong> ${data.neighborhood || 'Não informado'}</p>
        <p><strong>Rua:</strong> ${data.street || 'Não informado'}</p>
      `;
    })
    .catch(error => {
      resultado.innerHTML = `<p style="color:red">${error.message}</p>`;
    });
}
