import { Alert } from '@app/domain/entities';

export const formatAlertMessage = (params: {
  alert: Partial<Alert>;
  roleId: string;
}): string => {
  const formattedMessages: string = params.alert.data
    .map((item: { message: string }) => `• ${item.message}`)
    .join('\n');

  const message: string = `
<@&${params.roleId}>

# 🚨 Alerta de Monitoramento

## 📋 Detalhes do Orquestrador
> **Nome:** ${params.alert.orquestratorName}
> **ID:** ${params.alert.orquestratorId}

## 📢 Alertas Emitidos
> Total de alertas: **${params.alert.data.length}**

### 📝 Mensagens
\`\`\`
${formattedMessages}
\`\`\`

# 📅 Data da mensagem
> ${params.alert.createdAt.toLocaleString('pt-BR', {
    timeZone: 'America/Sao_Paulo',
    dateStyle: 'short',
    timeStyle: 'short',
  })}

*Gerado automaticamente pelo sistema de monitoramento*
  `.trim();

  return message;
};
