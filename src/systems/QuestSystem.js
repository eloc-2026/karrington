/**
 * Quest System - Manages quests and objectives
 */
export class QuestSystem {
  constructor(game) {
    this.game = game;
    this.activeQuests = [];
    this.completedQuests = [];

    // Quest database
    this.questDatabase = {
      'goblin_hunt': {
        id: 'goblin_hunt',
        name: 'Goblin Hunt',
        description: 'Defeat 5 goblins in the crypt',
        type: 'kill',
        target: 'goblin',
        required: 5,
        reward: { gold: 50, exp: 100 },
        giver: 'Guild Master'
      },
      'slime_problem': {
        id: 'slime_problem',
        name: 'Slime Problem',
        description: 'Clear out 8 slimes from the lower levels',
        type: 'kill',
        target: 'slime',
        required: 8,
        reward: { gold: 40, exp: 80 },
        giver: 'Village Elder'
      },
      'peaceful_path': {
        id: 'peaceful_path',
        name: 'The Peaceful Path',
        description: 'Spare 3 vulnerable enemies instead of killing them',
        type: 'spare',
        required: 3,
        reward: { gold: 100, exp: 150 },
        giver: 'The Scavenger'
      },
      'gold_collector': {
        id: 'gold_collector',
        name: 'Gold Collector',
        description: 'Collect 100 gold coins',
        type: 'collect',
        target: 'gold',
        required: 100,
        reward: { gold: 50, exp: 50 },
        giver: 'Merchant'
      }
    };
  }

  /**
   * Accept a quest
   */
  acceptQuest(questId) {
    const questData = this.questDatabase[questId];
    if (!questData) {
      console.error('Quest not found:', questId);
      return;
    }

    // Check if already active
    if (this.activeQuests.find(q => q.id === questId)) {
      console.log('Quest already active:', questId);
      return;
    }

    // Create quest instance
    const quest = {
      ...questData,
      progress: 0,
      accepted: true
    };

    this.activeQuests.push(quest);
    console.log('✅ Quest accepted:', quest.name);

    this.showQuestNotification(`New Quest: ${quest.name}`);
  }

  /**
   * Update quest progress
   */
  updateProgress(type, target, amount = 1) {
    for (const quest of this.activeQuests) {
      if (quest.type === type && (!quest.target || quest.target === target)) {
        quest.progress += amount;

        console.log(`📊 Quest progress: ${quest.name} (${quest.progress}/${quest.required})`);

        // Check if completed
        if (quest.progress >= quest.required) {
          this.completeQuest(quest);
        }
      }
    }
  }

  /**
   * Complete a quest
   */
  completeQuest(quest) {
    console.log('🎉 Quest completed:', quest.name);

    // Remove from active
    this.activeQuests = this.activeQuests.filter(q => q.id !== quest.id);

    // Add to completed
    this.completedQuests.push(quest);

    // Grant rewards
    if (quest.reward) {
      if (quest.reward.gold) {
        this.game.player.gold += quest.reward.gold;
        console.log(`💰 Rewarded ${quest.reward.gold} gold`);
      }
      if (quest.reward.exp) {
        console.log(`⭐ Rewarded ${quest.reward.exp} exp`);
      }
    }

    this.showQuestNotification(`Quest Complete: ${quest.name}!`, 'complete');
  }

  /**
   * Show quest notification
   */
  showQuestNotification(message, type = 'new') {
    const notification = document.createElement('div');
    notification.className = `quest-notification ${type}`;
    notification.innerHTML = `
      <span class="quest-icon">${type === 'complete' ? '✅' : '📜'}</span>
      <span class="quest-message">${message}</span>
    `;

    this.game.container.appendChild(notification);

    setTimeout(() => notification.remove(), 3000);
  }

  /**
   * Get available quests for an NPC
   */
  getAvailableQuests(npcName) {
    const available = [];

    for (const questId in this.questDatabase) {
      const quest = this.questDatabase[questId];

      // Check if quest is from this NPC
      if (quest.giver === npcName) {
        // Check if not already active or completed
        const isActive = this.activeQuests.find(q => q.id === questId);
        const isCompleted = this.completedQuests.find(q => q.id === questId);

        if (!isActive && !isCompleted) {
          available.push(quest);
        }
      }
    }

    return available;
  }

  /**
   * Get active quests for UI
   */
  getActiveQuests() {
    return this.activeQuests;
  }
}
