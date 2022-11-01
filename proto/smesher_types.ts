import type { MessageTypeDefinition } from '@grpc/proto-loader';

export interface ProtoGrpcType {
  google: {
    protobuf: {
      Any: MessageTypeDefinition
    }
    rpc: {
      Status: MessageTypeDefinition
    }
  }
  spacemesh: {
    v1: {
      AccountId: MessageTypeDefinition
      Activation: MessageTypeDefinition
      ActivationId: MessageTypeDefinition
      Amount: MessageTypeDefinition
      AppEvent: MessageTypeDefinition
      Block: MessageTypeDefinition
      CoinbaseResponse: MessageTypeDefinition
      EstimatedRewardsRequest: MessageTypeDefinition
      EstimatedRewardsResponse: MessageTypeDefinition
      IsSmeshingResponse: MessageTypeDefinition
      Layer: MessageTypeDefinition
      LayerLimits: MessageTypeDefinition
      LayerNumber: MessageTypeDefinition
      MeshTransaction: MessageTypeDefinition
      MinGasResponse: MessageTypeDefinition
      Nonce: MessageTypeDefinition
      PostConfigResponse: MessageTypeDefinition
      PostSetupComputeProvider: MessageTypeDefinition
      PostSetupComputeProvidersRequest: MessageTypeDefinition
      PostSetupComputeProvidersResponse: MessageTypeDefinition
      PostSetupOpts: MessageTypeDefinition
      PostSetupStatus: MessageTypeDefinition
      PostSetupStatusResponse: MessageTypeDefinition
      PostSetupStatusStreamResponse: MessageTypeDefinition
      Reward: MessageTypeDefinition
      SetCoinbaseRequest: MessageTypeDefinition
      SetCoinbaseResponse: MessageTypeDefinition
      SetMinGasRequest: MessageTypeDefinition
      SetMinGasResponse: MessageTypeDefinition
      SimpleInt: MessageTypeDefinition
      SimpleString: MessageTypeDefinition
      SmesherIDResponse: MessageTypeDefinition
      SmesherId: MessageTypeDefinition
      StartSmeshingRequest: MessageTypeDefinition
      StartSmeshingResponse: MessageTypeDefinition
      StopSmeshingRequest: MessageTypeDefinition
      StopSmeshingResponse: MessageTypeDefinition
      Transaction: MessageTypeDefinition
      TransactionId: MessageTypeDefinition
    }
  }
}

