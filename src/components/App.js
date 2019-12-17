import React, { Component } from 'react'
import Painel from './painel'
import Coluna from './coluna'
import SecondaryNav from './navbarSecundaria'
import Legenda from './legenda'
import styled from 'styled-components'
import * as actions from '../redux/actions/'
import moment from 'moment'
import 'flatpickr/dist/themes/material_blue.css'
import Flatpickr from 'react-flatpickr'
import pt from 'flatpickr/dist/l10n/pt.js'
import { connect } from 'react-redux'
import { bindActions } from './utils'
import ScrollSpy from './scrollSpy'

const Container = styled.div`
  margin: 1rem;
  background-color: lightgray;
  padding: 1rem;
  width: fit-content;
  @media (max-width: 767px) {
    width: auto;
  }
`

const ResponsiveMenu = styled.div`
  display: none;
  z-index: 999;
  @media (max-width: 1026px) {
    display: flex;
    justify-content: flex-end;
    margin-right: 1rem;
    color: #8d8d8d;
    position: fixed;
    right: 0;
    top: 10;
  }
`
const Label = styled.span`
  margin-right: 0.5rem;
  color: #337ab7;
  font-weight: bold;
`
const Botao = styled.button`
  margin-left: 0.4rem;
  background-color: lightblue;
  border: none;
  color: #4d4d4d;
  padding: 0.2rem 0.5rem;
  font-weight: bold;
  &:hover {
    cursor: pointer;
    background-color: #a5cbea;
  }
  @media (max-width: 767px) {
    margin-top: 1rem;
    width: 100% !important;
    margin-left: 0;
  }
`
export const Spinner = styled.div`
  border: 2px solid #f3f3f3;
  border-top: 2px solid #3498db;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  animation: spin 2s linear infinite;
  margin-left: 2rem;
`

const Atualizacao = styled.div`
  float: right;
  color: #464646;
  margin: 1rem;
  @media (max-width: 1026px) {
    float: inherit;
    font-size: 0.8rem;
    margin-right: 4rem;
  }
`

const LinkNoticias = styled.img`
  width: 160px;
  margin-top: 1rem;
  margin-left: 1rem;
  z-index: 999;

  @media (max-width: 767px) {
    width: 80px;
    margin-top: 1rem;
    margin-left: 1rem;
    z-index: 999;
  }
`

const LinkArquivadas = styled.a`
  color: #999;
  padding: 1rem 0;
  float: right;
  &:hover {
    color: #337ab7;
  }
`

class AppConnected extends Component {
  state = {
    date: new Date(Date.now())
  }

  timer = undefined

  clearTimer = () => clearInterval(this.timer)

  setTimer = () =>
    (this.timer = setInterval(
      () => this.props.actions.requisitaMaterias(),
      60000
    ))

  componentDidMount = () => {
    this.props.actions.requisitaMaterias()
    this.setTimer()
  }

  componentWillUnmount = () => {
    this.clearTimer()
  }

  handleOnChange = date => {
    this.setState({
      date
    })

    this.props.actions.requisitaMaterias(date)
  }

  render () {
    const { colunas } = this.props
    const { date } = this.state

    return (
      <div>
        <a href={URLSITE}>
          <LinkNoticias
            src={`${URLSITE}/++resource++senado.noticias/img/logo.svg`}
          />
        </a>
        <Atualizacao>{`Painel atualizado em ${moment(
          colunas.materias.horaDeAtualizacao
        ).format('DD/MM/YYYY, HH:mm:ss')}`}</Atualizacao>

        <SecondaryNav
          atualiza={this.props.actions.requisitaMaterias}
          dataDePublicacao={this.handleOnChange}
          timer={this.timer}
          clearTimer={this.clearTimer}
          setTimer={this.setTimer}
        />
        <Container>
          <Label>Selecionar por data:</Label>
          <Flatpickr
            options={{
              dateFormat: 'd-m-Y',
              locale: 'pt'
            }}
            value={date}
            onChange={date => {
              this.clearTimer()
              this.handleOnChange(date)
            }}
          />
          {date && (
            <Botao
              onClick={() => {
                this.clearTimer()
                this.handleOnChange(new Date())
                this.setTimer()
              }}
            >
              Dia atual
            </Botao>
          )}
        </Container>
        <div>
          <ResponsiveMenu>
            <input type='checkbox' id='menu' name='menu' />
            <label for='menu' className='fas fa-bars fa-2x' />
            <div className='spy'>
              <ScrollSpy />
            </div>
          </ResponsiveMenu>
          <Painel>
            {Object.keys(colunas) ? (
              Object.keys(colunas.materias).map(coluna => {
                if (coluna === 'arquivado') {
                  return
                }

                if (coluna === 'loading') {
                  return <Spinner />
                }

                if (coluna !== 'horaDeAtualizacao') {
                  const data = colunas.materias[coluna].data

                  const size = data.length

                  return (
                    <div id={coluna}>
                      <Coluna
                        key={coluna}
                        data={this.state.colunas}
                        listaPorColuna={data || []}
                        nomeColuna={coluna}
                        conteudos={colunas.materias[coluna].conteudos || []}
                        counter={size || 0}
                        dataDaBusca={date}
                      />
                      {coluna === 'publicado' && (
                        <LinkArquivadas href={URLSITE + '/arquivadas'}>
                          Acessar todas as notícias arquivadas
                        </LinkArquivadas>
                      )}
                    </div>
                  )
                }
              })
            ) : (
              <p>Loading ...</p>
            )}
          </Painel>
        </div>
        <Legenda />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return { colunas: state }
}

const App = connect(
  mapStateToProps,
  bindActions(actions)
)(AppConnected)

export default App
