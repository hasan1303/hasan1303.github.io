---
title: Building a 1M RPS API in Go
slug: building-1m-rps-api-go
excerpt: We optimized our internal API from 40k to 1.1M requests per second over 6 months. Here's exactly what we changed and why.
category: backend
tags: [Go, gRPC, Performance]
publishedAt: 2024-12-12
readTime: 14
featured: true
coverEmoji: 🔩
coverColor: "linear-gradient(135deg, #0a1428, #050910)"
---

## The Starting Point

Eighteen months ago, our internal metrics API was struggling at 40,000 requests per second. It was written in Go, deployed on Kubernetes, and backed by a PostgreSQL cluster. On paper, it should have been fine. In practice, it was catching fire every Thursday afternoon when our analytics jobs kicked in.

Today, that same API handles **1.1 million requests per second** with a P99 latency of 8ms. This is the full story of how we got there.

## Step 1: Switch from REST to gRPC

Our first observation was that JSON parsing was eating 18% of our CPU cycles. We were serializing and deserializing the same 14-field struct millions of times per second.

```protobuf
message MetricRequest {
  string metric_name = 1;
  int64 start_ts = 2;
  int64 end_ts = 3;
  repeated string tags = 4;
}
```

This alone gave us a **2.4x throughput improvement**.

## Step 2: Connection Pool Tuning

After the gRPC migration, profiling revealed our next bottleneck: connection establishment overhead.

> The fix wasn't just adding more connections — it was understanding that gRPC already multiplexes hundreds of streams over a single TCP connection.

We reduced our client-side connection pool from 100 connections to 8, and saw our TLS overhead drop by **90%**.

## Step 3: Read Replicas and Request Routing

With the networking layer optimized, the database became the bottleneck. We added 3 read replicas and implemented consistent hash-based routing.

## Results

| Metric | Before | After |
|--------|--------|-------|
| Throughput | 40k RPS | 1.1M RPS |
| P99 Latency | 180ms | 8ms |
| CPU Usage | 94% | 34% |
| Infrastructure Cost | Baseline | -40% |

The biggest lesson? **Profile first, optimize second.**
