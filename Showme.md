

```mermaid
graph TB
    A[Open Quiz App] --> B[Choose Language]
    A --> C[Theme Toggle]
    A --> D[Import Quiz]
    D --> E[Take Quiz]
    E --> F[See Feedback]
    E --> G[View Results]
    G --> H[Download PDF]

    class B highlight
    class C disabled

    classDef highlight fill:#d1fae5,stroke:#10b981,stroke-width:2px
    classDef disabled fill:#f3f4f6,stroke:#6b7280,stroke-width:2px
```
