// Original file: proto/debug.proto

import type * as grpc from '@grpc/grpc-js'
import type { MethodDefinition } from '@grpc/proto-loader'
import type { AccountsResponse as _spacemesh_v1_AccountsResponse, AccountsResponse__Output as _spacemesh_v1_AccountsResponse__Output } from '../../spacemesh/v1/AccountsResponse';
import type { Empty as _google_protobuf_Empty, Empty__Output as _google_protobuf_Empty__Output } from '../../google/protobuf/Empty';
import type { NetworkInfoResponse as _spacemesh_v1_NetworkInfoResponse, NetworkInfoResponse__Output as _spacemesh_v1_NetworkInfoResponse__Output } from '../../spacemesh/v1/NetworkInfoResponse';
import type { Proposal as _spacemesh_v1_Proposal, Proposal__Output as _spacemesh_v1_Proposal__Output } from '../../spacemesh/v1/Proposal';

export interface DebugServiceClient extends grpc.Client {
  Accounts(argument: _google_protobuf_Empty, metadata: grpc.Metadata, options: grpc.CallOptions, callback: (error?: grpc.ServiceError, result?: _spacemesh_v1_AccountsResponse__Output) => void): grpc.ClientUnaryCall;
  Accounts(argument: _google_protobuf_Empty, metadata: grpc.Metadata, callback: (error?: grpc.ServiceError, result?: _spacemesh_v1_AccountsResponse__Output) => void): grpc.ClientUnaryCall;
  Accounts(argument: _google_protobuf_Empty, options: grpc.CallOptions, callback: (error?: grpc.ServiceError, result?: _spacemesh_v1_AccountsResponse__Output) => void): grpc.ClientUnaryCall;
  Accounts(argument: _google_protobuf_Empty, callback: (error?: grpc.ServiceError, result?: _spacemesh_v1_AccountsResponse__Output) => void): grpc.ClientUnaryCall;
  accounts(argument: _google_protobuf_Empty, metadata: grpc.Metadata, options: grpc.CallOptions, callback: (error?: grpc.ServiceError, result?: _spacemesh_v1_AccountsResponse__Output) => void): grpc.ClientUnaryCall;
  accounts(argument: _google_protobuf_Empty, metadata: grpc.Metadata, callback: (error?: grpc.ServiceError, result?: _spacemesh_v1_AccountsResponse__Output) => void): grpc.ClientUnaryCall;
  accounts(argument: _google_protobuf_Empty, options: grpc.CallOptions, callback: (error?: grpc.ServiceError, result?: _spacemesh_v1_AccountsResponse__Output) => void): grpc.ClientUnaryCall;
  accounts(argument: _google_protobuf_Empty, callback: (error?: grpc.ServiceError, result?: _spacemesh_v1_AccountsResponse__Output) => void): grpc.ClientUnaryCall;
  
  NetworkInfo(argument: _google_protobuf_Empty, metadata: grpc.Metadata, options: grpc.CallOptions, callback: (error?: grpc.ServiceError, result?: _spacemesh_v1_NetworkInfoResponse__Output) => void): grpc.ClientUnaryCall;
  NetworkInfo(argument: _google_protobuf_Empty, metadata: grpc.Metadata, callback: (error?: grpc.ServiceError, result?: _spacemesh_v1_NetworkInfoResponse__Output) => void): grpc.ClientUnaryCall;
  NetworkInfo(argument: _google_protobuf_Empty, options: grpc.CallOptions, callback: (error?: grpc.ServiceError, result?: _spacemesh_v1_NetworkInfoResponse__Output) => void): grpc.ClientUnaryCall;
  NetworkInfo(argument: _google_protobuf_Empty, callback: (error?: grpc.ServiceError, result?: _spacemesh_v1_NetworkInfoResponse__Output) => void): grpc.ClientUnaryCall;
  networkInfo(argument: _google_protobuf_Empty, metadata: grpc.Metadata, options: grpc.CallOptions, callback: (error?: grpc.ServiceError, result?: _spacemesh_v1_NetworkInfoResponse__Output) => void): grpc.ClientUnaryCall;
  networkInfo(argument: _google_protobuf_Empty, metadata: grpc.Metadata, callback: (error?: grpc.ServiceError, result?: _spacemesh_v1_NetworkInfoResponse__Output) => void): grpc.ClientUnaryCall;
  networkInfo(argument: _google_protobuf_Empty, options: grpc.CallOptions, callback: (error?: grpc.ServiceError, result?: _spacemesh_v1_NetworkInfoResponse__Output) => void): grpc.ClientUnaryCall;
  networkInfo(argument: _google_protobuf_Empty, callback: (error?: grpc.ServiceError, result?: _spacemesh_v1_NetworkInfoResponse__Output) => void): grpc.ClientUnaryCall;
  
  ProposalsStream(argument: _google_protobuf_Empty, metadata: grpc.Metadata, options?: grpc.CallOptions): grpc.ClientReadableStream<_spacemesh_v1_Proposal__Output>;
  ProposalsStream(argument: _google_protobuf_Empty, options?: grpc.CallOptions): grpc.ClientReadableStream<_spacemesh_v1_Proposal__Output>;
  proposalsStream(argument: _google_protobuf_Empty, metadata: grpc.Metadata, options?: grpc.CallOptions): grpc.ClientReadableStream<_spacemesh_v1_Proposal__Output>;
  proposalsStream(argument: _google_protobuf_Empty, options?: grpc.CallOptions): grpc.ClientReadableStream<_spacemesh_v1_Proposal__Output>;
  
}

export interface DebugServiceHandlers extends grpc.UntypedServiceImplementation {
  Accounts: grpc.handleUnaryCall<_google_protobuf_Empty__Output, _spacemesh_v1_AccountsResponse>;
  
  NetworkInfo: grpc.handleUnaryCall<_google_protobuf_Empty__Output, _spacemesh_v1_NetworkInfoResponse>;
  
  ProposalsStream: grpc.handleServerStreamingCall<_google_protobuf_Empty__Output, _spacemesh_v1_Proposal>;
  
}

export interface DebugServiceDefinition extends grpc.ServiceDefinition {
  Accounts: MethodDefinition<_google_protobuf_Empty, _spacemesh_v1_AccountsResponse, _google_protobuf_Empty__Output, _spacemesh_v1_AccountsResponse__Output>
  NetworkInfo: MethodDefinition<_google_protobuf_Empty, _spacemesh_v1_NetworkInfoResponse, _google_protobuf_Empty__Output, _spacemesh_v1_NetworkInfoResponse__Output>
  ProposalsStream: MethodDefinition<_google_protobuf_Empty, _spacemesh_v1_Proposal, _google_protobuf_Empty__Output, _spacemesh_v1_Proposal__Output>
}
