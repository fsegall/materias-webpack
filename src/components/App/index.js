import React, { Component } from 'react'
import {
  Container,
  ResponsiveMenu,
  Label,
  Botao,
  Spinner,
  Atualizacao,
  LinkNoticias,
  LinkArquivadas
} from './styles'
import Grid from '../Grid'
import Coluna from '../Coluna'
import Header from '../Header'
import Legenda from '../Legenda'
import * as actions from '../../redux/actions'
import moment from 'moment'
import Flatpickr from 'react-flatpickr'
import 'flatpickr/dist/themes/material_blue.css'
import pt from 'flatpickr/dist/l10n/pt.js'
import { connect } from 'react-redux'
import { bindActions } from '../utils'
import ScrollSpy from '../ScrollSpy'

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
        <a href={'/noticias'}>
          <LinkNoticias
            src={`/noticias/++resource++senado.noticias/img/logo.svg`}
          />
        </a>
        <Atualizacao>{`Painel atualizado em ${moment(
          colunas.materias.horaDeAtualizacao
        ).format('DD/MM/YYYY, HH:mm:ss')}`}</Atualizacao>

        <Header
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
            <label htmlFor='menu' className='fas fa-bars fa-2x' />
            <div className='spy'>
              <ScrollSpy />
            </div>
          </ResponsiveMenu>
          <Grid>
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
                    <div id={coluna} key={coluna}>
                      <Coluna
                        data={this.state.colunas}
                        listaPorColuna={data || []}
                        nomeColuna={coluna}
                        conteudos={colunas.materias[coluna].conteudos || []}
                        counter={size || 0}
                        dataDaBusca={date}
                      />
                      {coluna === 'publicado' && (
                        <LinkArquivadas href={`/noticias/arquivadas`}>
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
          </Grid>
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
