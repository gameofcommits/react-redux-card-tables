import React from 'react';
import { Search } from '@material-ui/icons';
import { CardTable } from './components/CardTable';
import Badge from './components/Badge';

export default function App() {
  const url = '/demandas';
  const history = () => console.log('history');
  const getSituacao = (value) => {
    if (value === 'O.S. EXECUTADA, FISCALIZADA NÃO CONSTATADA') return 'NÃO CONSTATADA';
    if (value === 'O.S. EXECUTADA, FISCALIZADA CONSTATADA') return 'CONSTATADA';
    if (value === 'O.S. EXECUTADA, NÃO FISCALIZADA') return 'NÃO FISCALIZADA';
    if (value === 'CONCLUIDA PELO GERENTE') return 'CONCLUIDA';
    if (value === 'O.S. NÃO EXECUTADA') return 'NÃO EXECUTADA';
    return value;
  };
  return (
    <CardTable
      url={url}
      entity="Demanda"
      history={history}
      extraParams={{ order: 'dataHoraOcorrencia', orderType: 'desc' }}
      actionList={() => console.log('actionList')}
      actionDelete={() => console.log('actiondelete')}
      permissionPrefix="DEMANDAS"
      links={[{ label: 'Novo' }]}
      rowColor={(item) => {
        if (item.areaRisco) return '#ffe6e6';
        if (item.requerAcompanhamento) return '#ffebcc';
      }}
      extraActions={[
        {
          color: 'info',
          title: 'Detalhes',
          icon: Search,
          permission: 'DEMANDAS_LISTAR',
          click: item => history.push(`/${url}/${item.id}/detalhe`),
        },
      ]}
      fields={[
        {
          title: 'Protocolo',
          value: item => item.protocolo,
          tooltip: 'Detalhe da Demanda',
          click: item => history.push(`/${url}/${item.id}/detalhe`),
          permission: 'DEMANDAS_LISTAR',
        },
        {
          title: 'Endereço',
          value: item => `${item.logradouro || 'NÃO INFORMADO'}${
            item.numero ? `, N° ${item.numero}` : ''
          } ${item.complemento || ''} ${item.bairro ? `- ${item.bairro}` : ''}`,
        },
        {
          title: 'Regional',
          value: item => item.regional_sigla,
        },
        {
          title: 'Pessoa da Demanda',
          value: item => item.razaoSocial || item.nomeFantasia || 'NÃO INFORMADO',
        },
        {
          title: 'Tipo de Demanda',
          value: item => item.grupoDemanda,
          tooltip: item => item.grupoDemanda,
        },
        {
          title: 'Situação',
          alignCenter: true,
          value: item => <Badge color={item.situacaoCor}>{getSituacao(item.situacao)}</Badge>,
        },
      ]}
    />
  );
}
